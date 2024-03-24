import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

import { GetAnimeList } from '@dto/anime/GetAnimeList';

import { KodikWrapperService } from './kodikWrapper.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Year } from '@entities/kodik/Year';
import { Cron } from '@nestjs/schedule';
import { Genre } from '@entities/kodik/Genre';
import { Anime } from '@entities/kodik/Anime';
import { plainToInstance } from 'class-transformer';
import { AnimeDetails } from '@models/anime/AnimeListModel';

@Injectable()
export class KodikService {
  constructor(
    @InjectRepository(Year)
    private yearRepository: Repository<Year>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Anime)
    private animeRepository: Repository<Anime>,
    private readonly httpService: HttpService,
    private readonly kodikWrapper: KodikWrapperService
  ) {}
  private readonly logger = new Logger(KodikService.name);

  async getKodikList(options: GetAnimeList) {
    try {
      const url = this.kodikWrapper.getPublicUrl('/list', {
        ...options,
        with_episodes: true,
      });
      return this.httpService.post(url).pipe(map((res) => res.data));
    } catch (error) {
      console.log(error);
    }
  }

  @Cron('0 0 1 1 *') // every year
  async kodikYears() {
    try {
      const url = this.kodikWrapper.getPublicUrl('/years', {
        types: 'anime,anime-serial',
      });
      const response = await lastValueFrom(
        this.httpService.get(url).pipe(map((res) => res.data))
      );

      const years = response.results;

      for (const yearData of years) {
        const yearEntity = new Year();
        yearEntity.year = yearData.year;
        yearEntity.count = yearData.count;

        await this.yearRepository.save(yearEntity);
      }

      this.logger.log('Years saved successfully');
      return true;
    } catch (error) {
      this.logger.warn('Failed to fetch or save years');
      return false;
    }
  }

  async kodikGenres() {
    try {
      const url = this.kodikWrapper.getPublicUrl('/genres', {
        types: 'anime,anime-serial',
        genres_type: 'shikimori',
      });
      const response = await lastValueFrom(
        this.httpService.get(url).pipe(map((res) => res.data))
      );

      const genres = response.results;

      for (const genreData of genres) {
        const genreEntity = new Genre();
        genreEntity.title = genreData.title;
        genreEntity.count = genreData.count;

        await this.genreRepository.save(genreEntity);
      }

      this.logger.log('Genres saved successfully');
      return true;
    } catch (error) {
      this.logger.warn('Failed to fetch or save genres');
      return false;
    }
  }

  async kodikAnimes() {
    try {
      const url = this.kodikWrapper.getPublicUrl('/list', {
        limit: 100,
        types: 'anime,anime-serial',
        sort: 'updated_at',
        with_material_data: true,
        with_episodes: true,
      });

      let hasNextPage = true;
      let hasMoreData = true;
      let nextPageUrl = url;

      // Get the last updated date from the database
      const lastUpdatedAnime = await this.animeRepository.find({
        order: { kodikUpdatedAt: 'DESC' },
        take: 1, // Fetch only one row
      });
      const lastUpdatedDate = lastUpdatedAnime
        ? lastUpdatedAnime[0]?.kodikUpdatedAt
        : null;

      while (hasMoreData && hasNextPage) {
        const response = await lastValueFrom(
          this.httpService.get(nextPageUrl).pipe(map((res) => res.data))
        );
        const { results, next_page } = response;

        // Save anime data from the current page
        for (const animeData of results) {
          const animeEntity = new Anime();
          animeEntity.id = animeData.id;
          animeEntity.title = animeData.title;
          animeEntity.type = animeData.type;
          animeEntity.translation = animeData.translation;
          animeEntity.shikimoriId = animeData.shikimori_id;
          animeEntity.kodikCreatedAt = new Date(animeData.created_at);
          animeEntity.kodikUpdatedAt = new Date(animeData.updated_at);
          animeEntity.details = plainToInstance(AnimeDetails, {
            ...animeData,
            ...animeData.material_data,
          });

          // Check if the anime is already in the database and if it was updated
          if (
            lastUpdatedDate &&
            animeEntity.kodikUpdatedAt &&
            animeEntity.kodikUpdatedAt <= lastUpdatedDate
          ) {
            // Stop processing if we reach the last updated anime
            hasMoreData = false;
            this.logger.log('Animes updated successfully');
            break;
          }
          await this.animeRepository.save(animeEntity);
        }
        // Check if there is a next page
        if (next_page) {
          nextPageUrl = next_page;
        } else {
          hasNextPage = false;
        }
        this.logger.log('Parsing....');
      }

      this.logger.log('Animes parsed successfully');
      return true;
    } catch (error) {
      this.logger.warn('Failed to fetch or save animes', error);
      return false;
    }
  }
}

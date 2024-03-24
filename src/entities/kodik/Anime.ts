import { Translation } from '@models/anime/AnimeListModel';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

type EpisodeLinks = { [episodeNumber: string]: string };
type SeasonData = {
  link: string;
  episodes: EpisodeLinks;
};

type SeasonsData = { [seasonNumber: string]: SeasonData };

interface AnimeDetails {
  anime_title?: string;
  description: string;
  anime_status?: string;
  anime_description?: string;
  poster_url: string;
  all_genres: Array<string>;
  shikimori_rating?: number;
  anime_studios: Array<string>;
  shikimori_votes: number;
  year: number;
  minimal_age: number;
  last_season: number;
  last_episode: number;
  episodes_count: number;
  seasons: SeasonsData;
}

@Entity()
export class Anime {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  shikimoriId?: number;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column({
    type: 'jsonb',
  })
  translation: Translation;

  @Column({ type: 'jsonb' })
  details: AnimeDetails;

  @Column()
  kodikCreatedAt: Date;

  @Column()
  kodikUpdatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { GetAnimeList } from '@dto/anime/anime';

import { KodikWrapperService } from './kodikWrapper.service';
import { map } from 'rxjs';

@Injectable()
export class KodikService {
  constructor(
    private readonly httpService: HttpService,
    private readonly kodikWrapper: KodikWrapperService
  ) {}

  getKodikList(options: GetAnimeList) {
    try {
      const { limit, types } = options;
      const url = this.kodikWrapper.getPublicUrl('/list', { limit, types });
      return this.httpService.post(url).pipe(map((res) => res.data));
    } catch (error) {
      console.log(error);
    }
  }
}

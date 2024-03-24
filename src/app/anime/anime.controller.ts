import { KodikService } from '@app/kodik/kodik.service';

import { Controller, Get } from '@nestjs/common';
@Controller('anime')
export class AnimeController {
  constructor(private readonly kodikService: KodikService) {}

  @Get('list')
  getAnimeList() {
    return this.kodikService.kodikYears();
  }
}

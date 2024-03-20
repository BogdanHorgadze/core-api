import { KodikService } from '@app/kodik/kodik.service';
import { GetAnimeList } from '@dto/anime/anime';
import { Body, Controller, Get } from '@nestjs/common';

@Controller('anime')
export class AnimeController {
  constructor(private readonly kodikService: KodikService) {}

  @Get('list')
  getAnimeList(@Body() options: GetAnimeList) {
    return this.kodikService.getKodikList(options);
  }
}

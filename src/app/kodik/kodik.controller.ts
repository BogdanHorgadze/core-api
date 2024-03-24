import { Controller, Get } from '@nestjs/common';
import { KodikService } from '@app/kodik/kodik.service';

@Controller('kodik')
export class KodikController {
  constructor(private readonly kodikService: KodikService) {}

  @Get('years')
  parseKodikYears() {
    return this.kodikService.kodikYears();
  }

  @Get('genres')
  parseKodikGenres() {
    return this.kodikService.kodikGenres();
  }

  @Get('animes')
  parseKodikAnimes() {
    return this.kodikService.kodikAnimes();
  }
}

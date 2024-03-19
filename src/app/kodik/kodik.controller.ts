import { Controller } from '@nestjs/common';

import { KodikService } from './kodik.service';

@Controller('kodik')
export class KodikController {
  constructor(private readonly kodikService: KodikService) {}
}

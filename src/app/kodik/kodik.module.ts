import { Module } from '@nestjs/common';

import { KodikService } from './kodik.service';
import { KodikController } from './kodik.controller';
import { KodikWrapperService } from './kodikWrapper.service';

@Module({
  controllers: [KodikController],
  providers: [KodikService, KodikWrapperService],
})
export class KodikModule {}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { KodikService } from './kodik.service';
import { KodikWrapperService } from './kodikWrapper.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [KodikService, KodikWrapperService],
  exports: [KodikService],
})
export class KodikModule {}

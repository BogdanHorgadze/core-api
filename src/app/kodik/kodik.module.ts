import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { KodikService } from './kodik.service';
import { KodikWrapperService } from './kodikWrapper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Year } from '@entities/kodik/Year';
import { Genre } from '@entities/kodik/Genre';

import { KodikController } from './kodik.controller';
import { Anime } from '@entities/kodik/Anime';

@Module({
  imports: [TypeOrmModule.forFeature([Year, Genre, Anime]), HttpModule],
  controllers: [KodikController],
  providers: [KodikService, KodikWrapperService],
  exports: [KodikService],
})
export class KodikModule {}

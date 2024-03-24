import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import typeorm from '@configs/typeorm';

import { validate } from '@utils/envValidation';

import { KodikModule } from './kodik/kodik.module';
import { AnimeModule } from './anime/anime.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    KodikModule,
    AnimeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

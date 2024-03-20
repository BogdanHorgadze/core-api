import { KodikModule } from '@app/kodik/kodik.module';
import { Module } from '@nestjs/common';
import { AnimeController } from './anime.controller';

@Module({
  imports: [KodikModule],
  controllers: [AnimeController],
  providers: [],
})
export class AnimeModule {}

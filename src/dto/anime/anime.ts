import { Transform } from 'class-transformer';
import { IsInt, IsEnum } from 'class-validator';

enum ListTypesEnum {
  AnimeSerial = 'anime-serial',
  AnimeMovie = 'anime',
}

export class GetAnimeList {
  @IsInt()
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  limit: number;

  @IsEnum(ListTypesEnum, { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value.join(',') : value))
  types: ListTypesEnum[];
}

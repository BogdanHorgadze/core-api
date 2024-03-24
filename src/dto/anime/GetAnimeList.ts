import { Transform } from 'class-transformer';
import { IsInt, IsEnum, IsBoolean, IsOptional } from 'class-validator';

enum ListTypesEnum {
  AnimeSerial = 'anime-serial',
  AnimeMovie = 'anime',
}

export class GetAnimeList {
  @IsInt()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  limit: number;

  @IsEnum(ListTypesEnum, { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value.join(',') : value))
  types: ListTypesEnum[];

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === undefined ? value : value === 'true'), {
    toClassOnly: true,
  })
  with_material_data?: boolean;
}

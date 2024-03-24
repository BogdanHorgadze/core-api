import { Exclude, Expose } from 'class-transformer';

export type Translation = {
  id: number;
  title: string;
  type: string;
};

type EpisodeLinks = { [episodeNumber: string]: string };
type SeasonData = {
  link: string;
  episodes: EpisodeLinks;
};

type SeasonsData = { [seasonNumber: string]: SeasonData };

@Exclude()
export class AnimeDetails {
  @Expose()
  anime_title: string;

  @Expose()
  description: string;

  @Expose()
  anime_status: string;

  @Expose()
  anime_description: string;

  @Expose()
  poster_url: string;

  @Expose()
  all_genres: Array<string>;

  @Expose()
  shikimori_rating: number;

  @Expose()
  anime_studios: Array<string>;

  @Expose()
  shikimori_votes: number;

  @Expose()
  year: number;

  @Expose()
  minimal_age: number;

  @Expose()
  last_season: number;

  @Expose()
  last_episode: number;

  @Expose()
  episodes_count: number;

  @Expose()
  seasons: SeasonsData;
}

// @Exclude()
// class Results {
//   @Expose()
//   id: string;

//   @Expose()
//   type: string;

//   @Expose()
//   link: string;

//   @Expose()
//   title: string;

//   @Expose()
//   material_data: MaterialData;
// }

// @Exclude()
// export class AnimeListModel {
//   @Expose()
//   total: number;

//   @Expose()
//   prev_page: string;

//   @Expose()
//   next_page: string;

//   @Expose()
//   results: Results;
// }

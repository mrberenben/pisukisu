import { IEpisode } from "types/episode";
export interface ISerie {
  id: string;
  name: string;
  slug: string;
  description: string;
  genres: string[];
  sources: {
    image: string;
    thumbnail: string;
    poster?: string | null;
  };
  duration_avg: number;
  episodes: IEpisode[] | [];
}

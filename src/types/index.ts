import { Albums, BaseArtist, Playlists } from "../models";

export type AudioplayerTrackInfo = {
  previewUrl: string | null;
  name: string;
  artists: Partial<BaseArtist>[];
  image: string | null;
  presence: boolean;
  id?: string;
};

export type Ids = {
  ids: string;
};

export type SearchResult = Playlists | Albums | (Playlists & Albums);

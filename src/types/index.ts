import { Albums, BaseArtist, Playlists } from "../models";

export type TracklistItem = {
  id?: string;
  name?: string;
  artists?: Partial<Pick<BaseArtist, "name" | "id">>[];
  image?: string;
  previewUrl?: string | null;
  durationMs?: number;
};

export type AudioplayerTrackInfo = {
  presence: boolean;
} & TracklistItem;

export type Ids = {
  ids: string;
};

export type SearchResult = Playlists | Albums | (Playlists & Albums);

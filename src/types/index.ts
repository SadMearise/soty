import { BaseArtist } from "../models";

export type AudioplayerTrackInfo = {
  previewUrl: string;
  name: string;
  artists: Partial<BaseArtist>[];
  image: string | null;
  presence: boolean;
  id?: string;
};

export type Ids = {
  ids: string;
};

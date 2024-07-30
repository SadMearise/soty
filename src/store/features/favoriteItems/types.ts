import { TracklistItem } from "../../../types";

interface FavoriteBase {
  id?: string;
  name?: string;
  imageUrl?: string;
}

export interface FavoriteAlbum extends FavoriteBase {
  artistName?: string;
}

export interface FavoritePlaylist extends FavoriteBase {
  ownerName?: string | null;
}

export interface FavoriteItemsState {
  favoriteAlbums: FavoriteAlbum[];
  favoritePlaylists: FavoritePlaylist[];
  favoriteTracks: TracklistItem[];
  isLoadingAlbums: boolean;
  isLoadingPlaylists: boolean;
  isLoadingTracks: boolean;
}

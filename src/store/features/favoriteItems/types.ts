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
  isFavoriteAlbums: FavoriteAlbum[];
  isFavoritePlaylists: FavoritePlaylist[];
  totalFavoriteTracks: number;
  isLoadingAlbums: boolean;
  isLoadingPlaylists: boolean;
  isLoadingTracks: boolean;
}

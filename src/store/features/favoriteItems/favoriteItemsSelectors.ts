import { RootState } from "../../store";

export const selectFavoriteAlbums = (state: RootState) => state.favoriteItems.favoriteAlbums;
export const selectFavoritePlaylists = (state: RootState) => state.favoriteItems.favoritePlaylists;
export const selectFavoriteTracks = (state: RootState) => state.favoriteItems.favoriteTracks;
export const selectIsLoadingAlbums = (state: RootState) => state.favoriteItems.isLoadingAlbums;
export const selectIsLoadingPlaylists = (state: RootState) => state.favoriteItems.isLoadingPlaylists;
export const selectIsLoadingTracks = (state: RootState) => state.favoriteItems.isLoadingTracks;

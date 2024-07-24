import { RootState } from "../../store";

export const selectIsFavoriteAlbums = (state: RootState) => state.favoriteItems.isFavoriteAlbums;
export const selectIsFavoritePlaylists = (state: RootState) => state.favoriteItems.isFavoritePlaylists;
export const selectTotalFavoriteTracks = (state: RootState) => state.favoriteItems.totalFavoriteTracks;
export const selectIsLoadingAlbums = (state: RootState) => state.favoriteItems.isLoadingAlbums;
export const selectIsLoadingPlaylists = (state: RootState) => state.favoriteItems.isLoadingPlaylists;
export const selectIsLoadingTracks = (state: RootState) => state.favoriteItems.isLoadingTracks;

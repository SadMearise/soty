import {
  NewReleasesParams,
  fetchNewReleases,
  fetchAlbumById,
  AlbumParams,
  saveAlbumsForCurrentUser,
  removeUserSavedAlbums,
  checkUserSavedAlbums,
  SaveAlbumsForCurrentUserParams,
  RemoveUserSavedAlbumsParams,
  CheckUserSavedAlbumsParams,
} from "./albums";
import { fetchArtistById, fetchArtistAlbumsById, ArtistAlbumsByIdParams } from "./artists";
import { CategoriesParams, fetchCategories } from "./categories";
import { getAudioplayerTracksInfo, processUserSavedTracksChunk } from "./dataUtils";
import { fetchData } from "./fetchDataPattern";
import {
  FeaturedPlaylistsParams,
  fetchFeaturedPlaylists,
  CategoryPlaylistsParams,
  fetchCategoryPlaylistsById,
  PlaylistParams,
  fetchPlaylistById,
  fetchUserPlaylists,
  UserPlaylistsParams,
} from "./playlists";
import { fetchSection } from "./sections";
import { postToken, fetchRefreshToken } from "./token";
import {
  fetchCurrentUserProfile,
  fetchUserProfileById,
  checkIfUserFollowsPlaylist,
  followPlaylist,
  unfollowPlaylist,
  CheckIfUserFollowsPlaylistParams,
} from "./user";
import {
  saveTracksForCurrentUser,
  removeUserSavedTracks,
  checkUserSavedTracks,
  SaveTracksForCurrentUserParams,
  RemoveUserSavedTracksParams,
  CheckUserSavedTracksParams,
} from "./tracks";
import { fetchSearchItem } from "./search";

export {
  fetchNewReleases,
  fetchAlbumById,
  fetchArtistById,
  fetchArtistAlbumsById,
  fetchCategories,
  fetchData,
  fetchFeaturedPlaylists,
  fetchCategoryPlaylistsById,
  fetchPlaylistById,
  fetchSection,
  postToken,
  fetchRefreshToken,
  fetchCurrentUserProfile,
  fetchUserProfileById,
  saveTracksForCurrentUser,
  removeUserSavedTracks,
  checkUserSavedTracks,
  saveAlbumsForCurrentUser,
  removeUserSavedAlbums,
  checkUserSavedAlbums,
  getAudioplayerTracksInfo,
  processUserSavedTracksChunk,
  checkIfUserFollowsPlaylist,
  followPlaylist,
  unfollowPlaylist,
  fetchUserPlaylists,
  fetchSearchItem,
};

export type {
  NewReleasesParams,
  CategoriesParams,
  FeaturedPlaylistsParams,
  CategoryPlaylistsParams,
  AlbumParams,
  SaveTracksForCurrentUserParams,
  RemoveUserSavedTracksParams,
  CheckUserSavedTracksParams,
  ArtistAlbumsByIdParams,
  SaveAlbumsForCurrentUserParams,
  RemoveUserSavedAlbumsParams,
  CheckUserSavedAlbumsParams,
  PlaylistParams,
  CheckIfUserFollowsPlaylistParams,
  UserPlaylistsParams,
};

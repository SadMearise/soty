import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserSavedAlbums } from "../../../services/albums";
import { fetchCurrentUserSavedPlaylists } from "../../../services/playlists";
import { fetchUserSavedTracks } from "../../../services/tracks";
import { FavoriteAlbum, FavoriteItemsState, FavoritePlaylist } from "./types";
import { UserSavedTrack } from "../../../models";
import { TracklistItem } from "../../../types";

const initialState: FavoriteItemsState = {
  favoriteAlbums: [],
  favoritePlaylists: [],
  favoriteTracks: [],
  isLoadingAlbums: true,
  isLoadingPlaylists: true,
  isLoadingTracks: true,
};

export const fetchFavoriteAlbums = createAsyncThunk("favoriteItems/fetchFavoriteAlbums", async () => {
  const userAlbums = await fetchUserSavedAlbums({});

  return userAlbums.items.map((item) => ({
    id: item.album.id,
    name: item.album.name,
    artistName: item.album.artists[0].name,
    imageUrl: item.album.images[0].url,
  }));
});

export const fetchFavoritePlaylists = createAsyncThunk("favoriteItems/fetchFavoritePlaylists", async () => {
  const userPlaylists = await fetchCurrentUserSavedPlaylists({});

  return userPlaylists.items.map((item) => ({
    id: item.id,
    name: item.name,
    ownerName: item.owner?.display_name,
    imageUrl: item.images && item.images[0].url,
  }));
});

export const fetchFavoriteTracks = createAsyncThunk("favoriteItems/fetchFavoriteTracks", async () => {
  const fetchData = async (offset = 0, accumulatedTracks: UserSavedTrack[] = []): Promise<UserSavedTrack[]> => {
    const limit = 20;

    const response = await fetchUserSavedTracks({ offset, limit });

    const tracks = [...accumulatedTracks, ...response.items];

    if (tracks.length < response.total) {
      return fetchData(offset + limit, tracks);
    }

    return tracks;
  };

  const userTracks = await fetchData();

  return userTracks.map(({ track }) => ({
    id: track.id,
    name: track.name,
    artists: track.artists?.map(({ id, name }) => ({ id, name })),
    previewUrl: track.preview_url,
    image: track.album?.images[2].url,
    durationMs: track.duration_ms,
  }));
});

const favoriteItemsSlice = createSlice({
  name: "favoriteItems",
  initialState,
  reducers: {
    addFavoriteAlbum: (state, action: PayloadAction<FavoriteAlbum>) => {
      state.favoriteAlbums.unshift(action.payload);
    },
    removeFavoriteAlbum: (state, action: PayloadAction<FavoriteAlbum>) => {
      state.favoriteAlbums = state.favoriteAlbums.filter(
        (item) => JSON.stringify(item) !== JSON.stringify(action.payload)
      );
    },
    addFavoritePlaylist: (state, action: PayloadAction<FavoritePlaylist>) => {
      state.favoritePlaylists.unshift(action.payload);
    },
    removeFavoritePlaylist: (state, action: PayloadAction<FavoritePlaylist>) => {
      state.favoritePlaylists = state.favoritePlaylists.filter(
        (item) => JSON.stringify(item) !== JSON.stringify(action.payload)
      );
    },
    addFavoriteTrack: (state, action: PayloadAction<TracklistItem>) => {
      state.favoriteTracks.unshift(action.payload);
    },
    removeFavoriteTrack: (state, action: PayloadAction<string>) => {
      state.favoriteTracks = state.favoriteTracks.filter((item) => action.payload !== item.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteAlbums.pending, (state) => {
      state.isLoadingAlbums = true;
    });
    builder.addCase(fetchFavoriteAlbums.fulfilled, (state, action) => {
      state.isLoadingAlbums = false;
      state.favoriteAlbums = action.payload;
    });
    builder.addCase(fetchFavoriteAlbums.rejected, (state) => {
      state.isLoadingAlbums = false;
    });
    builder.addCase(fetchFavoritePlaylists.pending, (state) => {
      state.isLoadingPlaylists = true;
    });
    builder.addCase(fetchFavoritePlaylists.fulfilled, (state, action) => {
      state.isLoadingPlaylists = false;
      state.favoritePlaylists = action.payload;
    });
    builder.addCase(fetchFavoritePlaylists.rejected, (state) => {
      state.isLoadingPlaylists = false;
    });
    builder.addCase(fetchFavoriteTracks.pending, (state) => {
      state.isLoadingTracks = true;
    });
    builder.addCase(fetchFavoriteTracks.fulfilled, (state, action) => {
      state.isLoadingTracks = false;
      state.favoriteTracks = action.payload;
    });
    builder.addCase(fetchFavoriteTracks.rejected, (state) => {
      state.isLoadingTracks = false;
    });
  },
});

export const {
  addFavoriteAlbum,
  removeFavoriteAlbum,
  addFavoritePlaylist,
  removeFavoritePlaylist,
  addFavoriteTrack,
  removeFavoriteTrack,
} = favoriteItemsSlice.actions;

export default favoriteItemsSlice;

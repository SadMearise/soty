import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserSavedAlbums } from "../../../services/albums";
import { fetchCurrentUserSavedPlaylists } from "../../../services/playlists";
import { fetchUserSavedTracks } from "../../../services/tracks";
import { FavoriteAlbum, FavoriteItemsState, FavoritePlaylist } from "./types";

const initialState: FavoriteItemsState = {
  isFavoriteAlbums: [],
  isFavoritePlaylists: [],
  totalFavoriteTracks: 0,
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
  const userTracks = await fetchUserSavedTracks({});

  return userTracks.total;
});

const favoriteItemsSlice = createSlice({
  name: "favoriteItems",
  initialState,
  reducers: {
    addFavoriteAlbum: (state, action: PayloadAction<FavoriteAlbum>) => {
      state.isFavoriteAlbums.unshift(action.payload);
    },
    removeFavoriteAlbum: (state, action: PayloadAction<FavoriteAlbum>) => {
      state.isFavoriteAlbums = state.isFavoriteAlbums.filter(
        (item) => JSON.stringify(item) !== JSON.stringify(action.payload)
      );
    },
    addFavoritePlaylist: (state, action: PayloadAction<FavoritePlaylist>) => {
      state.isFavoritePlaylists.unshift(action.payload);
    },
    removeFavoritePlaylist: (state, action: PayloadAction<FavoritePlaylist>) => {
      state.isFavoritePlaylists = state.isFavoritePlaylists.filter(
        (item) => JSON.stringify(item) !== JSON.stringify(action.payload)
      );
    },
    increaseFavoriteTracks: (state) => {
      state.totalFavoriteTracks += 1;
    },
    decreaseFavoriteTracks: (state) => {
      state.totalFavoriteTracks -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteAlbums.pending, (state) => {
      state.isLoadingAlbums = true;
    });
    builder.addCase(fetchFavoriteAlbums.fulfilled, (state, action) => {
      state.isLoadingAlbums = false;
      state.isFavoriteAlbums = action.payload;
    });
    builder.addCase(fetchFavoriteAlbums.rejected, (state) => {
      state.isLoadingAlbums = false;
    });
    builder.addCase(fetchFavoritePlaylists.pending, (state) => {
      state.isLoadingPlaylists = true;
    });
    builder.addCase(fetchFavoritePlaylists.fulfilled, (state, action) => {
      state.isLoadingPlaylists = false;
      state.isFavoritePlaylists = action.payload;
    });
    builder.addCase(fetchFavoritePlaylists.rejected, (state) => {
      state.isLoadingPlaylists = false;
    });
    builder.addCase(fetchFavoriteTracks.pending, (state) => {
      state.isLoadingTracks = true;
    });
    builder.addCase(fetchFavoriteTracks.fulfilled, (state, action) => {
      state.isLoadingTracks = false;
      state.totalFavoriteTracks = action.payload;
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
  increaseFavoriteTracks,
  decreaseFavoriteTracks,
} = favoriteItemsSlice.actions;

export default favoriteItemsSlice;

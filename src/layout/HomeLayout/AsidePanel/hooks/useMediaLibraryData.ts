import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectFavoriteAlbums,
  selectFavoritePlaylists,
  selectIsLoadingAlbums,
  selectIsLoadingPlaylists,
  selectIsLoadingTracks,
  selectFavoriteTracks,
} from "../../../../store/features/favoriteItems/favoriteItemsSelectors";
import {
  fetchFavoriteAlbums,
  fetchFavoritePlaylists,
  fetchFavoriteTracks,
} from "../../../../store/features/favoriteItems/favoriteItemsSlice";

const useMediaLibraryData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const favoriteTracks = useAppSelector(selectFavoriteTracks);
  const favoriteAlbums = useAppSelector(selectFavoriteAlbums);
  const favoritePlaylists = useAppSelector(selectFavoritePlaylists);
  const isLoadingAlbums = useAppSelector(selectIsLoadingAlbums);
  const isLoadingPlaylists = useAppSelector(selectIsLoadingPlaylists);
  const isLoadingTracks = useAppSelector(selectIsLoadingTracks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteTracks());
    dispatch(fetchFavoriteAlbums());
    dispatch(fetchFavoritePlaylists());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(isLoadingAlbums || isLoadingPlaylists || isLoadingTracks);
  }, [isLoadingAlbums, isLoadingPlaylists, isLoadingTracks]);

  return { favoriteTracks, favoriteAlbums, favoritePlaylists, isLoading };
};

export default useMediaLibraryData;

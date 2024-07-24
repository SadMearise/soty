import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectIsFavoriteAlbums,
  selectIsFavoritePlaylists,
  selectIsLoadingAlbums,
  selectIsLoadingPlaylists,
  selectIsLoadingTracks,
  selectTotalFavoriteTracks,
} from "../../../../store/features/favoriteItems/favoriteItemsSelectors";
import {
  fetchFavoriteAlbums,
  fetchFavoritePlaylists,
  fetchFavoriteTracks,
} from "../../../../store/features/favoriteItems/favoriteItemsSlice";

const useMediaLibraryData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const totalFavoriteTracks = useAppSelector(selectTotalFavoriteTracks);
  const isFavoriteAlbums = useAppSelector(selectIsFavoriteAlbums);
  const isFavoritePlaylists = useAppSelector(selectIsFavoritePlaylists);
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

  return { totalFavoriteTracks, isFavoriteAlbums, isFavoritePlaylists, isLoading };
};

export default useMediaLibraryData;

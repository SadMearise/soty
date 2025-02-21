import { useEffect, useMemo, useState } from "react";
import { useNewReleasedPlaylists, useCategoryPlaylists, useFeaturedPlaylists } from "../../../utils/hooks";
import { CATEGORY_IDS, LINKS } from "../../../utils/constants";
import { SubtitleType } from "../../../components/enums";

const useHomeData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const {
    isError: isErrorFeaturedPlaylists,
    isLoading: isLoadingFeaturedPlaylists,
    featuredPlaylists,
  } = useFeaturedPlaylists(useMemo(() => ({ limit: 6 }), []));
  const {
    isError: isErrorNewReleasedPlaylists,
    isLoading: isLoadingNewReleasedPlaylists,
    newReleasedPlaylistsPath,
    newReleasedPlaylists,
  } = useNewReleasedPlaylists(useMemo(() => ({ limit: 9 }), []));
  const {
    isError: isErrorCategoryPlaylists,
    isLoading: isLoadingCategoryPlaylists,
    categoryPlaylistsPath,
    categoryPlaylists,
  } = useCategoryPlaylists(
    CATEGORY_IDS.sleep,
    useMemo(() => ({ limit: 9 }), [])
  );

  const playlistsList = [
    {
      playlists: newReleasedPlaylists,
      title: "Новые релизы для тебя",
      subtitleType: SubtitleType.Artists,
      route: `${LINKS.section.route}${newReleasedPlaylistsPath}`,
      singleLineList: true,
    },
    {
      playlists: categoryPlaylists,
      title: "Музыка для сна",
      subtitleType: SubtitleType.Description,
      route: `${LINKS.section.route}${categoryPlaylistsPath}`,
      singleLineList: true,
    },
  ];

  useEffect(() => {
    setIsError(isErrorFeaturedPlaylists || isErrorNewReleasedPlaylists || isErrorCategoryPlaylists);
  }, [isErrorFeaturedPlaylists, isErrorNewReleasedPlaylists, isErrorCategoryPlaylists]);

  useEffect(() => {
    setIsLoading(isLoadingFeaturedPlaylists || isLoadingNewReleasedPlaylists || isLoadingCategoryPlaylists);
  }, [isLoadingCategoryPlaylists, isLoadingFeaturedPlaylists, isLoadingNewReleasedPlaylists]);

  return { featuredPlaylists, playlistsList, isLoading, isError };
};

export default useHomeData;

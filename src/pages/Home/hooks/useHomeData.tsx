import { useEffect, useMemo, useState } from "react";
import { useNewReleasedPlaylists, useCategoryPlaylists, useFeaturedPlaylists } from "../../../utils/hooks";
import { CATEGORY_IDS, LINKS } from "../../../utils/constants";
import { SubtitleType } from "../../../components/Playlists/enums";

const useHomeData = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { isLoading: isLoadingFeaturedPlaylists, featuredPlaylists } = useFeaturedPlaylists(
    useMemo(() => ({ limit: 6 }), [])
  );
  const {
    isLoading: isLoadingNewReleasedPlaylists,
    newReleasedPlaylistsPath,
    newReleasedPlaylists,
  } = useNewReleasedPlaylists(useMemo(() => ({ limit: 9 }), []));
  const {
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
    setIsLoading(true);
    if (!isLoadingFeaturedPlaylists && !isLoadingNewReleasedPlaylists && !isLoadingCategoryPlaylists) {
      setIsLoading(false);
    }
  }, [isLoadingCategoryPlaylists, isLoadingFeaturedPlaylists, isLoadingNewReleasedPlaylists]);

  return { featuredPlaylists, playlistsList, isLoading };
};

export default useHomeData;

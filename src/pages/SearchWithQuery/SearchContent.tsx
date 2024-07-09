import { FC } from "react";
import { Playlists } from "../../components";
import { SubtitleType } from "../../components/Playlists/enums";
import { Albums, Playlists as PlaylistsModel } from "../../models";
import { FilterNames } from "./enums";

type SearchContentProps = {
  searchResults: (PlaylistsModel & Albums) | null;
  filter: string;
};

const classes = {
  allFiltersWrapper: "mt-[32px]",
  filterWrapper: "mt-[24px]",
};

const SearchContent: FC<SearchContentProps> = ({ searchResults, filter }) => {
  if (!searchResults) return null;

  switch (filter) {
    case FilterNames.All:
      return (
        <div className={classes.allFiltersWrapper}>
          <Playlists
            playlists={searchResults!.albums.items}
            title="Альбомы"
            subtitleType={SubtitleType.DateAndArtists}
            singleLineList
          />
          <Playlists
            playlists={searchResults!.playlists.items}
            title="Плейлисты"
            subtitleType={SubtitleType.Owner}
            singleLineList
          />
        </div>
      );

    case FilterNames.Albums:
      return (
        <div className={classes.filterWrapper}>
          <Playlists
            playlists={searchResults!.albums.items}
            subtitleType={SubtitleType.DateAndArtists}
          />
        </div>
      );

    case FilterNames.Playlists:
      return (
        <div className={classes.filterWrapper}>
          <Playlists
            playlists={searchResults!.playlists.items}
            subtitleType={SubtitleType.Owner}
          />
        </div>
      );

    default:
      return null;
  }
};

export default SearchContent;

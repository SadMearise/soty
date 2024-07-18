import { FC } from "react";
import { Playlists } from "../../components";
import { Albums, Playlists as PlaylistsModel } from "../../models";
import { FilterNames } from "./enums";
import { SubtitleType } from "../../components/enums";
import { SearchResult } from "../../types";

type SearchContentProps = {
  searchResults: SearchResult | null;
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
            playlists={(searchResults as Albums).albums.items}
            title="Альбомы"
            subtitleType={SubtitleType.DateAndArtists}
            singleLineList
          />
          <Playlists
            playlists={(searchResults as PlaylistsModel).playlists.items}
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
            playlists={(searchResults as Albums).albums.items}
            subtitleType={SubtitleType.DateAndArtists}
          />
        </div>
      );

    case FilterNames.Playlists:
      return (
        <div className={classes.filterWrapper}>
          <Playlists
            playlists={(searchResults as PlaylistsModel).playlists.items}
            subtitleType={SubtitleType.Owner}
          />
        </div>
      );

    default:
      return null;
  }
};

export default SearchContent;

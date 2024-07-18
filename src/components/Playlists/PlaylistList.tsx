import { FC } from "react";
import PlaylistCard from "./PlaylistCard";
import { AlbumItem, BasePlaylist } from "../../models";
import { SubtitleType } from "./enums";

type PlaylistListProps = {
  playlists: AlbumItem[] | Partial<BasePlaylist>[];
  subtitleType: SubtitleType;
  singleLineList?: boolean;
};

const classes = {
  list: "grid gap-[24px] xsm-min:grid-cols-2 md-min:grid-cols-3 xmd-min:grid-cols-4 lg-min:grid-cols-5 xl-min:grid-cols-6 3xl-min:grid-cols-9",
  singleLineList:
    "xsm-max:[&>*:nth-child(n+2)]:hidden md-max:[&>*:nth-child(n+3)]:hidden xmd-max:[&>*:nth-child(n+4)]:hidden lg-max:[&>*:nth-child(n+5)]:hidden xl-max:[&>*:nth-child(n+6)]:hidden 3xl-max:[&>*:nth-child(n+7)]:hidden",
};

const PlaylistList: FC<PlaylistListProps> = ({ playlists, subtitleType, singleLineList }) => {
  const defineSubtitle = (playlist: AlbumItem | Partial<BasePlaylist>) => {
    if (subtitleType === SubtitleType.Description && "description" in playlist) {
      return playlist.description!;
    }
    if (subtitleType === SubtitleType.Artists && "artists" in playlist) {
      return playlist.artists
        .filter((artist) => artist.name)
        .map((playlist) => playlist.name!)
        .join(", ");
    }
    if (subtitleType === SubtitleType.ReleaseDate && "release_date" in playlist) {
      return playlist.release_date.slice(0, 4);
    }
    if (subtitleType === SubtitleType.DateAndArtists && "release_date" && "artists" in playlist) {
      return `${playlist.release_date.slice(0, 4)} • ${playlist.artists
        .filter((artist) => artist.name)
        .map((playlist) => playlist.name!)
        .join(", ")}`;
    }
    if (subtitleType === SubtitleType.Owner && "owner" in playlist) {
      return playlist.owner?.display_name || "unknown";
    }

    return "";
  };

  return (
    <div className={`${classes.list} ${singleLineList && classes.singleLineList}`}>
      {playlists.map((playlist) => (
        <PlaylistCard
          id={playlist.id}
          type={playlist.type}
          name={playlist.name || "unknown"}
          imageUrl={playlist.images && playlist.images[0].url}
          subtitle={defineSubtitle(playlist)}
          key={playlist.id}
        />
      ))}
    </div>
  );
};

export default PlaylistList;

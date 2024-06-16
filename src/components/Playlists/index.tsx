import { FC } from "react";
import { Link } from "react-router-dom";
import { AlbumItem, BasePlaylist } from "../../models";
import PlaylistList from "./PlaylistList";
import { SubtitleType } from "./enums";

type PlaylistsProps = {
  playlists: AlbumItem[] | Partial<BasePlaylist>[];
  title: string;
  subtitleType: SubtitleType;
  route?: string;
  singleLineList?: boolean;
  showMoreText?: string;
};

const classes = {
  section: "mb-[16px]",
  header: "flex items-center justify-between mb-[8px]",
  title: "font-bold text-2xl text-white truncate",
  titleHover: "hover:underline",
  more: "font-bold text-sm text-nowrap text-grey-400 hover:underline",
};

const Playlists: FC<PlaylistsProps> = ({ playlists, title, subtitleType, route, singleLineList, showMoreText }) => (
  <section className={classes.section}>
    <div className={classes.header}>
      {route ? (
        <h2 className={`${classes.title} ${classes.titleHover}`}>
          <Link
            to={route}
            state={{ title }}
          >
            {title}
          </Link>
        </h2>
      ) : (
        <h2 className={classes.title}>{title}</h2>
      )}
      {route && (
        <Link
          to={route}
          state={{ title }}
          className={classes.more}
        >
          {showMoreText || "Показать все"}
        </Link>
      )}
    </div>
    <PlaylistList
      playlists={playlists}
      singleLineList={singleLineList}
      subtitleType={subtitleType}
    />
  </section>
);

export default Playlists;

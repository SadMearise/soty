import { FC } from "react";
import { Link } from "react-router-dom";
import { AlbumItem, BasePlaylist } from "../../models";
import PlaylistList from "./PlaylistList";
import SectionH3Title from "../SectionH3Title";
import { SubtitleType } from "./enums";

type PlaylistsProps = {
  playlists: AlbumItem[] | Partial<BasePlaylist>[];
  subtitleType: SubtitleType;
  route?: string;
  title?: string;
  singleLineList?: boolean;
  showMoreText?: string;
};

const classes = {
  section: "mb-[16px]",
  header: "flex items-center justify-between mb-[8px] gap-[8px]",
  title: "font-bold text-2xl text-white truncate",
  titleHover: "hover:underline",
  more: "font-bold text-sm whitespace-nowrap text-grey-400 hover:underline",
};

const Playlists: FC<PlaylistsProps> = ({ playlists, title, subtitleType, route, singleLineList, showMoreText }) => (
  <section className={classes.section}>
    <div className={classes.header}>
      {title && (
        <SectionH3Title
          title={title}
          route={route}
        />
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

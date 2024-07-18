import { FC } from "react";
import { BasePlaylist } from "../../models";
import EverydayPlaylistCard from "./EverydayPlaylistCard";

type EverydayPlaylistListProps = {
  playlists: BasePlaylist[];
};

const classes = {
  list: "grid gap-[8px] auto-rows-[48px] grid-rows-[48px] grid-cols-1 xmd-min:grid-cols-2 lg-min:grid-cols-3 xl-min:gap-[12px] xl-min:auto-rows-[64px] xl-min:grid-rows-[64px] 2xl-min:auto-rows-[80px] 2xl-min:grid-rows-[80px]",
};

const EverydayPlaylistList: FC<EverydayPlaylistListProps> = ({ playlists }) => (
  <div className={classes.list}>
    {playlists.map(({ type, id, images, name }) => (
      <EverydayPlaylistCard
        type={type}
        id={id}
        imageUrl={images[0].url}
        name={name}
        key={id}
      />
    ))}
  </div>
);

export default EverydayPlaylistList;

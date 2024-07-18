import { FC } from "react";
import { BasePlaylist } from "../../models";
import EverydayPlaylistList from "./EverydayPlaylistList";

type EverydayPlaylistsProps = {
  playlists: BasePlaylist[];
  title: string;
};

const classes = {
  title: "text-[2rem] font-bold text-white mb-2",
};

const EverydayPlaylists: FC<EverydayPlaylistsProps> = ({ playlists, title }) => (
  <section>
    <h2 className={classes.title}>{title}</h2>
    <EverydayPlaylistList playlists={playlists} />
  </section>
);

export default EverydayPlaylists;

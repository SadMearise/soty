import { FC } from "react";
import { PlaylistItem } from "../../models";
import PlaylistList from "./PlaylistList";
import PlaylistCard from "./PlaylistCard";

type EverydayPlaylistsProps = {
  playlists: PlaylistItem[];
  title: string;
};

const classes = {
  title: "text-[2rem] font-bold text-white mb-2",
};

const EverydayPlaylists: FC<EverydayPlaylistsProps> = ({ playlists, title }) => {
  return (
    <section>
      <h2 className={classes.title}>{title}</h2>
      <PlaylistList>
        {playlists.map(({ images, name, id }) => {
          return (
            <PlaylistCard
              url={images[0].url}
              name={name}
              key={id}
            />
          );
        })}
      </PlaylistList>
    </section>
  );
};

export default EverydayPlaylists;

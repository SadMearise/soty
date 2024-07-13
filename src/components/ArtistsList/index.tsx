import { FC } from "react";
import { BaseArtist } from "../../models";

type ArtistsListProps = {
  artists: Partial<Pick<BaseArtist, "name" | "id">>[];
};

const classes = {
  wrapper: "inline text-sm",
  text: "text-sm font-normal text-grey-100 truncate",
  textHover: "group-hover:text-white",
};

const ArtistsList: FC<ArtistsListProps> = ({ artists }) => {
  return (
    <div className={classes.wrapper}>
      {artists.map((artist, index) => {
        return (
          artist.id && (
            <span
              className={`${classes.text} ${classes.textHover}`}
              key={artist.id}
            >
              <span>{artist.name || ""}</span>
              {index < artists.length - 1 && ", "}
            </span>
          )
        );
      })}
    </div>
  );
};

export default ArtistsList;

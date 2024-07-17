import { FC, useRef } from "react";
import { BaseArtist } from "../../models";
import TranslateAnimation from "./TranslateAnimation";

type ArtistsListProps = {
  artists: Partial<Pick<BaseArtist, "name" | "id">>[];
};

const classes = {
  wrapper: "inline text-sm",
  text: "text-sm font-normal text-grey-100 whitespace-nowrap",
  textHover: "group-hover:text-white",
};

const ArtistsList: FC<ArtistsListProps> = ({ artists }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={classes.wrapper}
      ref={wrapperRef}
    >
      <TranslateAnimation
        wrapperRef={wrapperRef}
        dependencies={[artists]}
      >
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
      </TranslateAnimation>
    </div>
  );
};

export default ArtistsList;

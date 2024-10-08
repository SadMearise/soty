import { FC } from "react";
import { Link } from "react-router-dom";
import { Playback } from "..";
import { LINKS } from "../../utils/constants";
import { RoundedButtonColor, RoundedButtonSize } from "../enums";
import { useAppSelector } from "../../store/hooks";
import { selectIsPlaying, selectPlayingPlaylistId } from "../../store/features/audioplayer/audioplayerSelectors";
import { MusicType, Severity, TracklistType } from "../../types/enums";
import { useAlert, useHandlePlayback } from "../../utils/hooks";
import { PlaybackVariant } from "../Playback/enums";

type PlaylistCardProps = {
  name: string;
  subtitle: string;
  imageUrl?: string;
  type?: TracklistType;
  id?: string;
};

const PlaylistCard: FC<PlaylistCardProps> = ({ id, type, imageUrl, name, subtitle }) => {
  const handlePlayback = useHandlePlayback();
  const { displayCustomAlert } = useAlert();
  const playingPlaylistId = useAppSelector(selectPlayingPlaylistId);
  const isPlaying = useAppSelector(selectIsPlaying);
  const playlistIsPlaying = playingPlaylistId === id && isPlaying;

  const classes = {
    item: "relative p-[16px] bg-dark-300 rounded-[8px] transition-colors hover:bg-dark-200 group",
    itemImageWrapper: "relative mb-[16px] shadow-tertiary pb-[100%]",
    itemImage: "block absolute h-full w-full top-0 left-0 object-cover rounded-[6px]",
    playbackWrapper: `absolute bottom-[8px] right-[8px] transition ${
      !playlistIsPlaying && "opacity-0 "
    }  duration-100 ease-in ${
      !playlistIsPlaying && "translate-y-[10px]"
    }  group-hover:opacity-100 group-hover:translate-y-0 z-10`,
    itemTitle: "truncate font-bold text-white text-base pb-[4px]",
    itemSubtitle: "font-normal text-sm text-grey-100 line-clamp-2",
    itemLink: "absolute w-full h-full top-0 left-0",
  };

  const handlePlaybackClick = async () => {
    const errorMessage = "The Playlist cannot be played";

    if (!type || !id) {
      displayCustomAlert(Severity.Error, errorMessage);

      return;
    }

    handlePlayback(
      {
        as: MusicType.Tracklist,
        type,
        id,
      },
      { playingPlaylistId: id },
      errorMessage
    );
  };

  return (
    id && (
      <article className={classes.item}>
        <div className={classes.itemImageWrapper}>
          {imageUrl && (
            <img
              src={imageUrl}
              className={classes.itemImage}
            />
          )}
          <div className={classes.playbackWrapper}>
            <Playback
              isPlaying={playlistIsPlaying}
              variant={PlaybackVariant.Rounded}
              roundedButtonSize={RoundedButtonSize.Xmd}
              roundedButtonColor={RoundedButtonColor.Green}
              iconColorFill="fill-black"
              onClick={handlePlaybackClick}
              shadow
            />
          </div>
        </div>
        <h4 className={classes.itemTitle}>{name}</h4>
        <div className={classes.itemSubtitle}>{subtitle}</div>
        {type && (
          <Link
            to={`/${LINKS[type].route}/${id}`}
            className={classes.itemLink}
          />
        )}
      </article>
    )
  );
};

export default PlaylistCard;

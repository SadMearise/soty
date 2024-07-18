import { FC } from "react";
import { withTooltip } from "../../hocs";
import { SvgGenerator, Tooltip } from "..";
import TracklistItem from "./TracklistItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIsPlaying, selectPlayingTrack } from "../../store/features/audioplayer/audioplayerSelectors";
import { AudioplayerTrackInfo } from "../../types";
import { getAudioplayerTracksInfo } from "../../services";
import { playback, setTracksInfo } from "../../store/features/audioplayer/audioplayerSlice";
import { MusicType, Severity, TracklistType } from "../../types/enums";
import { BaseArtist } from "../../models";
import { useAlert } from "../../utils/hooks";
import { TooltipPosition } from "../../hocs/enums";

export type Track = {
  id: string;
  name: string;
  artists: Partial<Pick<BaseArtist, "name" | "id">>[];
  image: string;
  previewUrl: string | null;
};

type T = {
  as: MusicType.Tracklist;
  type: TracklistType;
};

type P = {
  as: MusicType.CurrentUserTracks;
  ids: string[];
};

type TracklistProps = {
  id: string;
  tracks: Partial<Track>[];
  tracksPresence: boolean[];
} & (T | P);

const classes = {
  wrapper: "mb-[32px]",
  header:
    "grid grid-cols-[16px_minmax(120px,_4fr)_1fr] gap-[16px] px-[16px] border-b border-solid border-white/10 py-[7px] mb-[16px]",
  leftCol: "flex justify-center items-center",
  centerCol: "flex flex-col justify-center",
  rightCol: "flex justify-end items-center",
  text: "text-sm font-normal text-grey-100",
};

const Tracklist: FC<TracklistProps> = ({ tracks, tracksPresence, id, ...props }) => {
  const dispatch = useAppDispatch();
  const { displayCustomAlert } = useAlert();
  const isPlaying = useAppSelector(selectIsPlaying);
  const playingTrack = useAppSelector(selectPlayingTrack);

  const handleTrackPlayback = async (trackIndex: number) => {
    let tracksInfo: AudioplayerTrackInfo[] = [];
    if (props.as === MusicType.Tracklist) {
      tracksInfo = await getAudioplayerTracksInfo({
        as: props.as,
        type: props.type,
        id,
      });
    } else if (props.as === MusicType.CurrentUserTracks) {
      tracksInfo = await getAudioplayerTracksInfo({
        as: props.as,
        ids: props.ids,
        currentUserTracks: tracks,
      });
    }

    if (!tracksInfo.length) {
      displayCustomAlert(Severity.Error, "The Track cannot be played");
    } else {
      dispatch(setTracksInfo(tracksInfo));
      dispatch(playback({ playingPlaylistId: id, trackIndex }));
    }
  };

  const DurationIconWithTooltip = withTooltip(
    () => (
      <SvgGenerator
        id="schedule"
        colorFill="fill-grey-100"
        size="19px"
      />
    ),
    Tooltip
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <span className={`${classes.leftCol} ${classes.text}`}>#</span>
        <span className={`${classes.centerCol} ${classes.text}`}>Название</span>
        <div className={classes.rightCol}>
          <DurationIconWithTooltip
            tooltipText="Длительность"
            position={TooltipPosition.Top}
          />
        </div>
      </div>
      {tracks.map(({ id, name, artists, previewUrl, image }, index) => (
        <TracklistItem
          key={id}
          id={id}
          name={name}
          imageSrc={image}
          artists={artists}
          trackNumber={index + 1}
          trackPresence={tracksPresence[index]}
          isPlaying={playingTrack ? isPlaying && id === playingTrack.id : false}
          onPlaybackClick={() => handleTrackPlayback(index)}
          disabled={!previewUrl}
        />
      ))}
    </div>
  );
};

export default Tracklist;

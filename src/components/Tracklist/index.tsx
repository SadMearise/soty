import { FC } from "react";
import { withTooltip } from "../../hocs";
import { SvgGenerator, Tooltip } from "..";
import TracklistItem from "./TracklistItem";
import { useAppSelector } from "../../store/hooks";
import { selectIsPlaying, selectPlayingTrack } from "../../store/features/audioplayer/audioplayerSelectors";
import { MusicType, Severity, SvgGeneratorId, TracklistType } from "../../types/enums";
import { useAlert, useHandlePlayback } from "../../utils/hooks";
import { TooltipPosition } from "../../hocs/enums";
import { GetAudioplayerTracksInfoProps } from "../../services/dataUtils";
import { TracklistItem as TracklistItemType } from "../../types";

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
  tracks: Partial<TracklistItemType>[];
  tracksPresence: boolean[];
  coverImage?: string;
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

const Tracklist: FC<TracklistProps> = ({ tracks, tracksPresence, id, coverImage, ...props }) => {
  const { displayCustomAlert } = useAlert();
  const handlePlayback = useHandlePlayback();
  const isPlaying = useAppSelector(selectIsPlaying);
  const playingTrack = useAppSelector(selectPlayingTrack);

  const handleTrackPlayback = async (trackIndex: number) => {
    const errorMessage = "The Track cannot be played";
    let getAudioplayerTracksInfoProps: GetAudioplayerTracksInfoProps;

    if (props.as === MusicType.Tracklist) {
      getAudioplayerTracksInfoProps = {
        as: props.as,
        type: props.type,
        id,
      };
    } else if (props.as === MusicType.CurrentUserTracks) {
      getAudioplayerTracksInfoProps = {
        as: props.as,
        ids: props.ids,
        currentUserTracks: tracks,
      };
    } else {
      displayCustomAlert(Severity.Error, errorMessage);

      return;
    }

    handlePlayback(getAudioplayerTracksInfoProps, { playingPlaylistId: id, trackIndex }, errorMessage);
  };

  const DurationIconWithTooltip = withTooltip(
    () => (
      <SvgGenerator
        id={SvgGeneratorId.Schedule}
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
      {tracks.map(({ id, name, artists, previewUrl, image, durationMs }, index) => (
        <TracklistItem
          key={id}
          id={id}
          name={name}
          durationMs={durationMs}
          image={image}
          artists={artists}
          trackNumber={index + 1}
          presence={tracksPresence[index]}
          isPlaying={playingTrack ? isPlaying && id === playingTrack.id : false}
          onPlaybackClick={() => handleTrackPlayback(index)}
          previewUrl={previewUrl}
          coverImage={coverImage}
        />
      ))}
    </div>
  );
};

export default Tracklist;

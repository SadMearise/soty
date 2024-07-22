import { ActionBar, Loader, ReleaseCover, Tracklist } from "../../components";
import { Container } from "../../containers";
import { getAudioplayerTracksInfo } from "../../services";
import { selectIsPlaying, selectPlayingPlaylistId } from "../../store/features/audioplayer/audioplayerSelectors";
import { playback, setTracksInfo } from "../../store/features/audioplayer/audioplayerSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AudioplayerTrackInfo } from "../../types";
import { MusicType, Severity } from "../../types/enums";
import { ERRORS, PROJECT_NAME } from "../../utils/constants";
import { useAlert, useTitle } from "../../utils/hooks";
import { CURRENT_USER_PLAYLIST_ID } from "./contantsx";
import useTracksData from "./hooks/useTracksData";

const classes = {
  section: "pb-[32px] pt-[24px]",
};

const Tracks = () => {
  const { tracks, currentUser, isLoading, isError } = useTracksData();
  const tracksIds = tracks ? tracks.filter((item) => item.track.id).map((item) => item.track.id!) : [];
  useTitle(`${PROJECT_NAME} - Любимые треки`);
  const { displayCustomAlert } = useAlert();
  const dispatch = useAppDispatch();
  const playingPlaylistId = useAppSelector(selectPlayingPlaylistId);
  const isPlaying = useAppSelector(selectIsPlaying);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !currentUser) {
    throw Error(ERRORS.nodata);
  }

  const playlistIsPlaying = playingPlaylistId === CURRENT_USER_PLAYLIST_ID && isPlaying;

  const handlePlaylistPlayback = async () => {
    const tracksInfo: AudioplayerTrackInfo[] = await getAudioplayerTracksInfo({
      as: MusicType.CurrentUserTracks,
      ids: tracksIds,
      currentUserTracks: tracks.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        artists: item.track.artists?.map(({ id, name }) => ({ id, name })),
        previewUrl: item.track.preview_url,
      })),
    });

    if (!tracksInfo.length) {
      displayCustomAlert(Severity.Error, "The Playlist cannot be played");
    } else {
      dispatch(setTracksInfo(tracksInfo));
      dispatch(playback({ playingPlaylistId: CURRENT_USER_PLAYLIST_ID }));
    }
  };

  return (
    <Container>
      <section className={classes.section}>
        <ReleaseCover
          typeText="Плейлист"
          tracksDurationMs={tracks.reduce((res, { track }) => res + Number(track.duration_ms), 0)}
          release={{
            imageUrl: "./images/favorite.png",
            name: "Любимые треки",
            totalTracks: tracks.length,
          }}
          owner={{
            imageUrl: currentUser.images && currentUser.images[0].url,
            name: currentUser.display_name,
          }}
        />
        <ActionBar
          isPlaying={playlistIsPlaying}
          onPlaybackClick={handlePlaylistPlayback}
        />
        <Tracklist
          as={MusicType.CurrentUserTracks}
          tracks={tracks.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists?.map(({ id, name }) => ({ id, name })),
            previewUrl: track.preview_url,
            image: track.album?.images[2].url,
            durationMs: track.duration_ms,
          }))}
          id={CURRENT_USER_PLAYLIST_ID}
          ids={tracksIds}
          tracksPresence={new Array(tracks.length).fill(true)}
        />
      </section>
    </Container>
  );
};

export default Tracks;

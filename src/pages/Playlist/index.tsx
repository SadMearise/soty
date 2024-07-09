import { ActionBar, FavoriteAction, Loader, Playlists, ReleaseCover, Tracklist } from "../../components";
import { FavoriteButtonSize } from "../../components/FavoriteButton/enums";
import { SubtitleType } from "../../components/Playlists/enums";
import { Container } from "../../containers";
import { TooltipPosition } from "../../hocs/withTooltip/enums";
import { getAudioplayerTracksInfo } from "../../services";
import { selectIsPlaying, selectPlayingPlaylistId } from "../../store/features/audioplayer/audioplayerSelectors";
import { playback, setTracksInfo } from "../../store/features/audioplayer/audioplayerSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Severity } from "../../types/enums";
import { AudioplayerTrackInfo } from "../../types";
import { ERRORS, PROJECT_NAME } from "../../utils/constants";
import { useAlert, useTitle } from "../../utils/hooks";
import useFavorite from "../Album/hooks/useFavorite";
import usePlaylistData from "./hooks/usePlaylistData";

const classes = {
  section: "pb-[32px] pt-[24px]",
};

const Playlist = () => {
  const { playlist, userProfile, tracksPresence, playlistPresence, userPlaylists, isLoading, isError } =
    usePlaylistData();
  const { isFavorite, handleFavoriteClick } = useFavorite(playlistPresence, playlist?.id);
  useTitle(
    playlist?.name && userProfile?.display_name
      ? `${playlist.name} - playlist by ${userProfile.display_name} | ${PROJECT_NAME}`
      : null
  );
  const dispatch = useAppDispatch();
  const { displayCustomAlert } = useAlert();
  const playingPlaylistId = useAppSelector(selectPlayingPlaylistId);
  const isPlaying = useAppSelector(selectIsPlaying);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !playlist || !playlist.id || !playlist.name || !playlist.type || !userProfile || !playlist.tracks) {
    throw Error(ERRORS.nodata);
  }

  const playlistIsPlaying = playingPlaylistId === playlist?.id && isPlaying;

  const handlePlaylistPlayback = async () => {
    const tracksInfo: AudioplayerTrackInfo[] = await getAudioplayerTracksInfo(playlist.type!, playlist.id!);

    if (!tracksInfo.length) {
      displayCustomAlert(Severity.Error, "The Playlist cannot be played");
    } else {
      dispatch(setTracksInfo(tracksInfo));
      dispatch(playback({ playingPlaylistId: playlist?.id }));
    }
  };

  return (
    <Container>
      <section className={classes.section}>
        <ReleaseCover
          typeText="Плейлист"
          tracksDurationMs={playlist.tracks.items.reduce(
            (res, item) => (item.track ? res + Number(item.track.duration_ms) : res),
            0
          )}
          release={{
            imageUrl: playlist.images && playlist.images[0].url,
            name: playlist.name,
            totalTracks: playlist.tracks.total,
          }}
          artist={{
            imageUrl: userProfile.images && userProfile.images[1].url,
            name: userProfile.display_name,
          }}
        />
        <ActionBar
          actions={
            <FavoriteAction
              onFavoriteClick={handleFavoriteClick}
              isFavorite={isFavorite}
              tooltip={{
                text: isFavorite ? "Удалить из медиатеки" : "Добавить в медиатеку",
                position: TooltipPosition.Top,
              }}
              iconSize={FavoriteButtonSize.MdAdaptive}
            />
          }
          isPlaying={playlistIsPlaying}
          onPlaybackClick={handlePlaylistPlayback}
        />
        <Tracklist
          id={playlist.id}
          type={playlist.type}
          tracks={playlist.tracks.items
            .filter(({ track }) => track)
            .map(({ track }) => ({
              id: track!.id,
              name: track!.name,
              artists: track!.artists?.map(({ id, name }) => ({ id, name })),
              previewUrl: track!.preview_url,
            }))}
          tracksPresence={tracksPresence}
        />
        {userPlaylists && Boolean(userPlaylists.length) && (
          <Playlists
            playlists={userPlaylists.filter((item) => item.id !== playlist.id)}
            title="Возможно, тебе понравится"
            subtitleType={SubtitleType.Artists}
            singleLineList
          />
        )}
      </section>
    </Container>
  );
};

export default Playlist;

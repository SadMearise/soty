import { ActionBar, FavoriteAction, Loader, Playlists, ReleaseCover, Tracklist } from "../../components";
import { SubtitleType, FavoriteButtonSize } from "../../components/enums";
import { Container } from "../../containers";
import { selectIsPlaying, selectPlayingPlaylistId } from "../../store/features/audioplayer/audioplayerSelectors";
import { useAppSelector } from "../../store/hooks";
import { MusicType } from "../../types/enums";
import { ERRORS, PROJECT_NAME } from "../../utils/constants";
import { useHandlePlayback, useTitle } from "../../utils/hooks";
import usePlaylistData from "./hooks/usePlaylistData";
import { TooltipPosition } from "../../hocs/enums";
import useFavorite from "./hooks/useFavorite";

const classes = {
  section: "pb-[32px] pt-[24px]",
};

const Playlist = () => {
  const handlePlayback = useHandlePlayback();
  const { playlist, userProfile, tracksPresence, playlistPresence, userPlaylists, isLoading, isError } =
    usePlaylistData();
  const { isFavorite, handleFavoriteClick } = useFavorite(playlistPresence, playlist);
  useTitle(
    playlist?.name && userProfile?.display_name
      ? `${playlist.name} - playlist by ${userProfile.display_name} | ${PROJECT_NAME}`
      : null
  );
  const playingPlaylistId = useAppSelector(selectPlayingPlaylistId);
  const isPlaying = useAppSelector(selectIsPlaying);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !playlist || !playlist.id || !playlist.name || !playlist.type || !userProfile || !playlist.tracks) {
    throw Error(ERRORS.nodata);
  }

  const playlistIsPlaying = playingPlaylistId === playlist?.id && isPlaying;

  const handlePlaylistPlaybackClick = async () => {
    handlePlayback(
      {
        as: MusicType.Tracklist,
        type: playlist.type!,
        id: playlist.id!,
      },
      { playingPlaylistId: playlist?.id },
      "The Playlist cannot be played"
    );
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
          owner={{
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
          onPlaybackClick={handlePlaylistPlaybackClick}
        />
        <Tracklist
          as={MusicType.Tracklist}
          id={playlist.id}
          type={playlist.type}
          tracks={playlist.tracks.items
            .filter(({ track }) => track)
            .map(({ track }) => ({
              id: track?.id,
              name: track?.name,
              artists: track?.artists?.map(({ id, name }) => ({ id, name })),
              previewUrl: track?.preview_url,
              durationMs: track?.duration_ms,
            }))}
          tracksPresence={tracksPresence}
          coverImage={playlist.images?.[0]?.url ?? undefined}
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

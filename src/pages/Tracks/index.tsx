import { ActionBar, Loader, ReleaseCover, Tracklist } from "../../components";
import { Container } from "../../containers";
import { MusicType } from "../../types/enums";
import { ERRORS, PROJECT_NAME } from "../../utils/constants";
import { useHandlePlayback, useTitle } from "../../utils/hooks";
import { CURRENT_USER_PLAYLIST_ID } from "./contantsx";
import useTracksData from "./hooks/useTracksData";

const classes = {
  section: "pb-[32px] pt-[24px]",
  noContentWrapper: "flex items-center justify-center h-[50vh]",
  noContentTitle: "text-5xl font-bold tracking-[-0.04em] md-max:text-lg",
};

const Tracks = () => {
  const { currentUser, tracks, playingPlaylistId, isPlaying, tracksIds, isLoading } = useTracksData();
  const handlePlayback = useHandlePlayback();
  useTitle(`${PROJECT_NAME} - Любимые треки`);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentUser) {
    throw Error(ERRORS.nodata);
  }

  const playlistIsPlaying = playingPlaylistId === CURRENT_USER_PLAYLIST_ID && isPlaying;

  const handlePlaylistPlaybackClick = async () => {
    handlePlayback(
      {
        as: MusicType.CurrentUserTracks,
        ids: tracksIds,
        currentUserTracks: tracks.map(({ id, name, artists, previewUrl, image }) => ({
          id,
          name,
          artists,
          previewUrl,
          image,
        })),
      },
      { playingPlaylistId: CURRENT_USER_PLAYLIST_ID },
      "The Playlist cannot be played"
    );
  };

  return (
    <Container>
      <section className={classes.section}>
        <ReleaseCover
          typeText="Плейлист"
          tracksDurationMs={tracks.reduce((res, curr) => res + Number(curr.durationMs), 0)}
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
        {!tracks.length ? (
          <div className={classes.noContentWrapper}>
            <h2 className={classes.noContentTitle}>У вас пока нет любимых треков</h2>
          </div>
        ) : (
          <>
            <ActionBar
              isPlaying={playlistIsPlaying}
              onPlaybackClick={handlePlaylistPlaybackClick}
            />
            <Tracklist
              as={MusicType.CurrentUserTracks}
              tracks={tracks.map(({ id, name, artists, previewUrl, image, durationMs }) => ({
                id,
                name,
                artists,
                previewUrl,
                image,
                durationMs,
              }))}
              id={CURRENT_USER_PLAYLIST_ID}
              ids={tracksIds}
              tracksPresence={new Array(tracks.length).fill(true)}
            />
          </>
        )}
      </section>
    </Container>
  );
};

export default Tracks;

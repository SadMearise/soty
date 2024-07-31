import { getAlbumReleaseDate } from "../../utils/helpers";
import { Playlists, ReleaseCover, Copyrights, Tracklist, Loader, ActionBar, FavoriteAction } from "../../components";
import { ERRORS, PROJECT_NAME } from "../../utils/constants";
import { Container } from "../../containers";
import { useAppSelector } from "../../store/hooks";
import { selectIsPlaying, selectPlayingPlaylistId } from "../../store/features/audioplayer/audioplayerSelectors";
import useFavorite from "./hooks/useFavorite";
import { useHandlePlayback, useTitle } from "../../utils/hooks";
import { MusicType } from "../../types/enums";
import useAlbumData from "./hooks/useAlbumData";
import { FavoriteButtonSize, SubtitleType } from "../../components/enums";
import { TooltipPosition } from "../../hocs/enums";

const classes = {
  section: "pb-[32px] pt-[24px]",
};

const Album = () => {
  const handlePlayback = useHandlePlayback();
  const { album, artist, artistAlbums, tracksPresence, albumsPresence, isLoading, isError } = useAlbumData();
  const { isFavorite, handleFavoriteClick } = useFavorite(albumsPresence, album);
  useTitle(album && artist ? `${album.name} - Album by ${artist.name} | ${PROJECT_NAME}` : null);
  const playingPlaylistId = useAppSelector(selectPlayingPlaylistId);
  const isPlaying = useAppSelector(selectIsPlaying);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !album || !artist) {
    throw Error(ERRORS.nodata);
  }

  const albumIsPlaying = playingPlaylistId === album.id && isPlaying;

  const handleAlbumPlaybackClick = async () => {
    handlePlayback(
      {
        as: MusicType.Tracklist,
        type: album.type,
        id: album.id,
      },
      { playingPlaylistId: album.id },
      "The Album cannot be played"
    );
  };

  return (
    <Container>
      <section className={classes.section}>
        <ReleaseCover
          typeText="Альбом"
          tracksDurationMs={album.tracks.items.reduce((res, track) => res + Number(track.duration_ms), 0)}
          release={{
            imageUrl: album.images[0].url,
            name: album.name,
            releaseDate: album.release_date,
            totalTracks: album.total_tracks,
          }}
          owner={{
            imageUrl: artist.images[2].url,
            name: artist.name,
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
          isPlaying={albumIsPlaying}
          onPlaybackClick={handleAlbumPlaybackClick}
        />
        <Tracklist
          as={MusicType.Tracklist}
          id={album.id}
          type={album.type}
          tracks={album.tracks.items.map(({ id, name, artists, preview_url: previewUrl, duration_ms: durationMs }) => ({
            id,
            name,
            artists: artists?.map(({ id, name }) => ({ id, name })),
            previewUrl,
            durationMs,
          }))}
          tracksPresence={tracksPresence}
          coverImage={album.images[0].url}
        />
        <Copyrights
          releaseDate={getAlbumReleaseDate(album.release_date.split("-"))}
          copyrights={album.copyrights}
        />
        {Boolean(artistAlbums.length) && (
          <Playlists
            playlists={artistAlbums.filter((item) => item.id !== album.id)}
            title={`${artist.name}: другие альбомы`}
            subtitleType={SubtitleType.ReleaseDate}
            singleLineList
          />
        )}
      </section>
    </Container>
  );
};

export default Album;

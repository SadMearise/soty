import { getAlbumReleaseDate } from "../../utils/helpers";
import { Playlists, ReleaseCover, Copyrights, Tracklist, Loader, ActionBar, FavoriteAction } from "../../components";
import { ERRORS, PROJECT_NAME } from "../../utils/constants";
import { SubtitleType } from "../../components/Playlists/enums";
import { TooltipPosition } from "../../hocs/withTooltip/enums";
import { FavoriteButtonSize } from "../../components/FavoriteButton/enums";
import { Container } from "../../containers";
import { playback, setTracksInfo } from "../../store/features/audioplayer/audioplayerSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIsPlaying, selectPlayingPlaylistId } from "../../store/features/audioplayer/audioplayerSelectors";
import { AudioplayerTrackInfo } from "../../types";
import { getAudioplayerTracksInfo } from "../../services";
import useFavorite from "./hooks/useFavorite";
import { useAlert, useTitle } from "../../utils/hooks";
import { Severity } from "../../types/enums";
import useAlbumData from "./hooks/useAlbumData";

const classes = {
  section: "pb-[32px] pt-[24px]",
};

const Album = () => {
  const { album, artist, artistAlbums, tracksPresence, albumsPresence, isLoading, isError } = useAlbumData();
  const { isFavorite, handleFavoriteClick } = useFavorite(albumsPresence, album?.id);
  useTitle(album && artist ? `${album.name} - Album by ${artist.name} | ${PROJECT_NAME}` : null);
  const { displayCustomAlert } = useAlert();
  const dispatch = useAppDispatch();
  const playingPlaylistId = useAppSelector(selectPlayingPlaylistId);
  const isPlaying = useAppSelector(selectIsPlaying);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !album || !artist) {
    throw Error(ERRORS.nodata);
  }

  const albumIsPlaying = playingPlaylistId === album.id && isPlaying;

  const handleAlbumPlayback = async () => {
    const tracksInfo: AudioplayerTrackInfo[] = await getAudioplayerTracksInfo(album.type, album.id);

    if (!tracksInfo.length) {
      displayCustomAlert(Severity.Error, "The Album cannot be played");
    } else {
      dispatch(setTracksInfo(tracksInfo));
      dispatch(playback({ playingPlaylistId: album.id }));
    }
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
          artist={{
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
          onPlaybackClick={handleAlbumPlayback}
        />
        <Tracklist
          id={album.id}
          type={album.type}
          tracks={album.tracks.items.map(({ id, name, artists, preview_url: previewUrl }) => ({
            id,
            name,
            artists: artists?.map(({ id, name }) => ({ id, name })),
            previewUrl,
          }))}
          tracksPresence={tracksPresence}
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

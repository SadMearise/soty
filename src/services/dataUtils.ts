import { Album, BaseTrack, Playlist, TrackItem, TrackObject } from "../models";
import { MusicType, TracklistType } from "../types/enums";
import { AudioplayerTrackInfo, TracklistItem } from "../types";
import { fetchAlbumById, fetchPlaylistById, checkUserSavedTracks } from ".";

export const processUserSavedTracksChunk = async (
  ids: string[],
  maxIdsPerRequest: number = 50,
  startIndex: number = 0,
  tracksPresence: boolean[] = []
): Promise<boolean[]> => {
  const chunkIds = ids.slice(startIndex, startIndex + maxIdsPerRequest);
  if (chunkIds.length === 0) return tracksPresence;

  const newTracksPresence = await checkUserSavedTracks({ ids: chunkIds.join(",") });

  tracksPresence.push(...newTracksPresence);

  return processUserSavedTracksChunk(ids, 50, startIndex + maxIdsPerRequest, tracksPresence);
};

export type TracksProps = {
  as: MusicType.CurrentUserTracks;
  ids: string[];
  currentUserTracks: TracklistItem[];
};

export type TracklistProps = {
  as: MusicType.Tracklist;
  type: TracklistType;
  id: string;
};

export type GetAudioplayerTracksInfoProps = TracksProps | TracklistProps;

export const getAudioplayerTracksInfo = async ({ ...props }: GetAudioplayerTracksInfoProps) => {
  let tracksInfo: AudioplayerTrackInfo[] = [];
  let tracksPresence: boolean[] = [];

  const extractTracksData = (
    tracksPresence: boolean[],
    items?: BaseTrack[] | Partial<TrackItem>[] | TracklistItem[],
    imageUrl?: string
  ) => {
    if (!items) return [];

    return items.reduce((res: AudioplayerTrackInfo[], item, index) => {
      let track: BaseTrack | TrackObject | TracklistItem;

      if ("track" in item) {
        track = (item as Partial<TrackItem>).track!;
      } else {
        track = item as BaseTrack | TracklistItem;
      }

      res.push({
        previewUrl:
          ("preview_url" in track && track.preview_url) || ("previewUrl" in track && track.previewUrl) || null,
        name: track.name || "",
        artists: track.artists || [],
        image:
          imageUrl ||
          ("album" in track && track.album?.images[2].url) ||
          ("image" in track && track.image) ||
          undefined,
        id: track.id,
        presence: tracksPresence[index],
        durationMs:
          ("durationMs" in track && track.durationMs) || ("duration_ms" in track && track.duration_ms) || undefined,
      });

      return res;
    }, []);
  };

  if (props.as === MusicType.Tracklist && props.type === TracklistType.Album) {
    const getAlbumData = async (): Promise<{
      albumData: Album;
      ids: string[];
    }> => {
      const albumData = await fetchAlbumById(props.id);

      const ids = albumData.tracks.items.filter((item) => "id" in item).map((item) => item.id!);

      return { albumData, ids };
    };

    const { albumData, ids } = await getAlbumData();

    tracksPresence = await processUserSavedTracksChunk(ids);

    tracksInfo = extractTracksData(
      tracksPresence,
      albumData.tracks?.items,
      albumData.images && albumData.images[1].url
    );
  }

  if (props.as === MusicType.Tracklist && props.type === TracklistType.Playlist) {
    const getPlaylistData = async (): Promise<{
      playlistData: Playlist;
      ids: string[];
    }> => {
      const playlistData = await fetchPlaylistById(props.id);

      const ids = playlistData.tracks?.items.filter((item) => item.track?.id).map(({ track }) => track!.id) as string[];

      return { playlistData, ids };
    };

    const { playlistData, ids } = await getPlaylistData();

    tracksPresence = await processUserSavedTracksChunk(ids);

    tracksInfo = extractTracksData(tracksPresence, playlistData.tracks?.items);
  }

  if (props.as === MusicType.CurrentUserTracks) {
    tracksPresence = await processUserSavedTracksChunk(props.ids);

    tracksInfo = extractTracksData(tracksPresence, props.currentUserTracks);
  }

  return tracksInfo;
};

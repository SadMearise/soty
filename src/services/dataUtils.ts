import { Album, BaseTrack, Playlist, TrackItem, TrackObject } from "../models";
import { TracklistType } from "../types/enums";
import { AudioplayerTrackInfo } from "../types";
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

export const getAudioplayerTracksInfo = async (type: TracklistType, id: string) => {
  let tracksInfo: AudioplayerTrackInfo[] = [];
  let tracksPresence: boolean[] = [];

  const fetchTracksData = async (fetchFunction: (id: string) => Promise<Album | Playlist>, id: string) => {
    const data = await fetchFunction(id);

    const ids = data.tracks?.items
      .filter((item) => ("track" in item ? item.track?.id : "id" in item && item.id))
      .map((item) => ("track" in item ? item.track?.id : "id" in item && item.id)) as string[];

    return { data, ids };
  };

  const extractTracksData = (
    tracksPresence: boolean[],
    items?: Partial<BaseTrack>[] | Partial<TrackItem>[],
    imageUrl?: string
  ) => {
    if (!items) return [];

    return items.reduce((res: AudioplayerTrackInfo[], item, index) => {
      let track: Partial<BaseTrack> | Partial<TrackObject>;

      if ("track" in item) {
        track = (item as Partial<TrackItem>).track!;
      } else {
        track = item as Partial<BaseTrack>;
      }

      if (track.preview_url) {
        res.push({
          previewUrl: track.preview_url,
          name: track.name || "",
          artists: track.artists || [],
          image: imageUrl || ("album" in track && track.album?.images[2].url) || null,
          id: track.id,
          presence: tracksPresence[index],
        });
      }

      return res;
    }, []);
  };

  if (type === TracklistType.Album) {
    const { ids, data } = await fetchTracksData(fetchAlbumById, id);

    tracksPresence = await processUserSavedTracksChunk(ids);

    tracksInfo = extractTracksData(tracksPresence, data.tracks?.items, data.images && data.images[1].url);
  }

  if (type === TracklistType.Playlist) {
    const { ids, data } = await fetchTracksData(fetchPlaylistById, id);

    tracksPresence = await processUserSavedTracksChunk(ids);

    tracksInfo = extractTracksData(tracksPresence, data.tracks?.items);
  }

  return tracksInfo;
};

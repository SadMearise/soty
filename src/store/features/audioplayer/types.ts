import { AudioplayerTrackInfo } from "../../../types";

export interface PlaybackAction {
  playingPlaylistId?: string | null;
  trackIndex?: number;
}

export interface AudioplayerState {
  tracks: AudioplayerTrackInfo[];
  playingTrack: AudioplayerTrackInfo | null;
  isPlaying: boolean;
  playingPlaylistId: string | null;
  trackIndex: number;
}

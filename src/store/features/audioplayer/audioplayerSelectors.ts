import { RootState } from "../../store";

export const selectPlayingTrack = (state: RootState) => state.audioplayer.playingTrack;
export const selectIsPlaying = (state: RootState) => state.audioplayer.isPlaying;
export const selectPlayingPlaylistId = (state: RootState) => state.audioplayer.playingPlaylistId;

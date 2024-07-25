import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AudioplayerTrackInfo } from "../../../types";
import { AudioplayerState, PlaybackAction } from "./types";

const initialState: AudioplayerState = {
  tracks: [],
  playingTrack: null,
  isPlaying: false,
  playingPlaylistId: null,
  trackIndex: 0,
};

const audioplayerSlice = createSlice({
  name: "audioplayer",
  initialState,
  reducers: {
    playback: (state, action: PayloadAction<PlaybackAction>) => {
      const { playingPlaylistId, trackIndex } = action.payload;

      const isTrackIndex = typeof trackIndex === "number";

      if (
        state.isPlaying &&
        state.playingPlaylistId === playingPlaylistId &&
        (!isTrackIndex || trackIndex === state.trackIndex)
      ) {
        state.isPlaying = false;
      } else {
        state.playingTrack = isTrackIndex ? state.tracks[trackIndex] : state.tracks[state.trackIndex];
        state.isPlaying = true;
        state.trackIndex = isTrackIndex ? trackIndex : state.trackIndex;

        if (playingPlaylistId) state.playingPlaylistId = playingPlaylistId;
      }
    },
    setTracksInfo: (state, action: PayloadAction<AudioplayerTrackInfo[]>) => {
      if (JSON.stringify(action.payload) !== JSON.stringify(state.tracks)) {
        state.tracks = action.payload;
      }
    },
    setTrackPresence: (state, action: PayloadAction<boolean>) => {
      if (state.playingTrack) {
        state.playingTrack.presence = action.payload;
      }

      state.tracks[state.trackIndex].presence = action.payload;
    },
    nextTrack: (state) => {
      if (!state.playingTrack) return;

      const initNextTrack = () => {
        if (state.trackIndex + 1 < state.tracks.length) {
          state.playingTrack = state.tracks[state.trackIndex + 1];
          state.trackIndex += 1;
        } else {
          state.playingTrack = state.tracks[0];
          state.trackIndex = 0;
        }

        if (!state.playingTrack?.previewUrl) {
          initNextTrack();
        }
      };

      initNextTrack();
    },
    prevTrack: (state) => {
      if (!state.playingTrack) return;

      const initPrevTrack = () => {
        if (state.trackIndex - 1 >= 0) {
          state.playingTrack = state.tracks[state.trackIndex - 1];
          state.trackIndex -= 1;
        } else {
          state.playingTrack = state.tracks[state.tracks.length - 1];
          state.trackIndex = state.tracks.length - 1;
        }

        if (!state.playingTrack?.previewUrl) {
          initPrevTrack();
        }
      };

      initPrevTrack();
    },
  },
});

export const { playback, setTracksInfo, setTrackPresence, nextTrack, prevTrack } = audioplayerSlice.actions;

export default audioplayerSlice;

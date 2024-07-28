import { useState } from "react";
import { getAudioplayerTracksInfo } from "../../services";
import { useAppDispatch } from "../../store/hooks";
import { AudioplayerTrackInfo } from "../../types";
import { useAlert } from ".";
import { playback, setTracksInfo } from "../../store/features/audioplayer/audioplayerSlice";
import { PlaybackAction } from "../../store/features/audioplayer/types";
import { Severity } from "../../types/enums";
import { GetAudioplayerTracksInfoProps } from "../../services/dataUtils";

const useHandlePlayback = () => {
  const dispatch = useAppDispatch();

  const [isProcessing, setIsProcessing] = useState(false);

  const { displayCustomAlert } = useAlert();

  const handlePlayback = async (
    getAudioplayerTracksInfoProps: GetAudioplayerTracksInfoProps,
    playbackAction: PlaybackAction,
    alertMessage: string
  ) => {
    if (isProcessing) return;

    setIsProcessing(true);

    const tracksInfo: AudioplayerTrackInfo[] = await getAudioplayerTracksInfo(getAudioplayerTracksInfoProps);

    if (!tracksInfo.length) {
      displayCustomAlert(Severity.Error, alertMessage);
    } else {
      dispatch(setTracksInfo(tracksInfo));
      dispatch(playback(playbackAction));
    }

    setIsProcessing(false);
  };

  return handlePlayback;
};

export default useHandlePlayback;

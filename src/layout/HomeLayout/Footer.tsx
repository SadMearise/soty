import { Audioplayer } from "../../components";
import { useAppSelector } from "../../store/hooks";
import { selectPlayingTrack } from "../../store/features/audioplayer/audioplayerSelectors";

const Footer = () => {
  const playingTrack = useAppSelector(selectPlayingTrack);

  const classes = {
    footer: `transition-all ${playingTrack ? "h-[72px] mt-[8px]" : "h-0"}`,
  };

  return (
    <footer className={classes.footer}>
      <Audioplayer />
    </footer>
  );
};

export default Footer;

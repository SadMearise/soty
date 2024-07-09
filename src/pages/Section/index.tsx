import { useLocation, useParams } from "react-router-dom";
import { Loader, Playlists } from "../../components";
import { useSectionPlaylists } from "../../utils/hooks";
import { CARD_COUNT } from "./constants";
import { SubtitleType } from "../../components/Playlists/enums";
import { ERRORS } from "../../utils/constants";
import { Container } from "../../containers";

const classes = {
  wrapper: "py-[32px]",
};

const Section = () => {
  const { state }: { state: { title: string } } = useLocation();
  const { "*": endpoint } = useParams();
  const searchParams = window.location.search;

  if (!endpoint) {
    throw Error(ERRORS.nodata);
  }

  const params = searchParams
    .split("&")
    .map((el) => (el.includes("limit") ? `limit=${CARD_COUNT}` : el))
    .join("&");

  const { playlists, isLoading, isError } = useSectionPlaylists(endpoint, params);

  if (isError) {
    throw Error(ERRORS.nodata);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className={classes.wrapper}>
        <Playlists
          playlists={playlists}
          title={state.title}
          subtitleType={SubtitleType.Description}
        />
      </div>
    </Container>
  );
};

export default Section;

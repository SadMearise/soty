import { EverydayPlaylists, Loader, Playlists } from "../../components";
import { greeting } from "../../utils/helpers";
import { useTitle } from "../../utils/hooks";
import { LINKS } from "../../utils/constants";
import { Container } from "../../containers";
import useHomeData from "./hooks/useHomeData";

const classes = {
  wrapper: "flex flex-col gap-[24px] pt-[8px] pb-[72px]",
};

const Home = () => {
  const { featuredPlaylists, playlistsList, isLoading } = useHomeData();

  useTitle(LINKS.home.title);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className={classes.wrapper}>
        {Boolean(featuredPlaylists.length) && (
          <EverydayPlaylists
            playlists={featuredPlaylists}
            title={greeting()}
          />
        )}
        {playlistsList.map(({ playlists, title, subtitleType, route, singleLineList }, index) => {
          return (
            Boolean(playlists.length) && (
              <Playlists
                playlists={playlists}
                title={title}
                subtitleType={subtitleType}
                route={route}
                singleLineList={singleLineList}
                key={index}
              />
            )
          );
        })}
      </div>
    </Container>
  );
};

export default Home;

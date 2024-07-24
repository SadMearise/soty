import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "../../../assets/css/scrollbar.css";
import { Loader, MediaLibraryItem, SvgGenerator } from "../../../components";
import { getDeclension } from "../../../utils/helpers";
import { LINKS } from "../../../utils/constants";
import { useScrollbar } from "../../../utils/hooks";
import { BlockContainer } from "../../../containers";
import useMediaLibraryData from "./hooks/useMediaLibraryData";

const classes = {
  container: "flex flex-col grow overflow-hidden p-[8px] md-max:px-[4px] md-max:py-[8px]",
  header: "flex items-center gap-5 p-[8px] md-max:justify-center md-max:px-[8px] md-max:py-[16px]",
  headerTitle: "flex items-center h-[40px] font-bold text-base text-grey-100 md-max:hidden",
  content: "overflow-y-auto grow",
  overlayScrollbars: "h-full scrollbar",
  icon: "w-6 h-auto",
};

const MediaLibrary = () => {
  const { totalFavoriteTracks, isFavoriteAlbums, isFavoritePlaylists, isLoading } = useMediaLibraryData();

  const { scrollContainerRef } = useScrollbar();

  return (
    <BlockContainer styles={classes.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.header}>
            <SvgGenerator
              id="media"
              className={classes.icon}
              size="24px"
              colorFill="fill-grey-100"
            />
            <span className={classes.headerTitle}>Моя медиатека</span>
          </div>
          <div className={classes.content}>
            <OverlayScrollbarsComponent
              element="div"
              className={classes.overlayScrollbars}
              ref={scrollContainerRef}
              options={{
                scrollbars: {
                  visibility: "auto",
                  autoHide: "leave",
                },
              }}
              defer
            >
              <MediaLibraryItem
                imageSrc="./images/favorite.png"
                title="Любимые треки"
                subtitle={`Плейлист • ${getDeclension(totalFavoriteTracks, ["трек", "трека", "треков"])}`}
                link={LINKS.tracks.route}
              />
              {isFavoriteAlbums.map((album) => {
                return (
                  album.id && (
                    <MediaLibraryItem
                      key={album.id}
                      imageSrc={album.imageUrl}
                      title={album.name}
                      subtitle={`Альбом • ${album.artistName || "unknown"}`}
                      link={`/${LINKS.album.route}/${album.id}`}
                    />
                  )
                );
              })}
              {isFavoritePlaylists.map((playlist) => {
                return (
                  playlist.id && (
                    <MediaLibraryItem
                      key={playlist.id}
                      imageSrc={playlist.imageUrl}
                      title={playlist.name}
                      subtitle={`Плейлист • ${playlist.ownerName}`}
                      link={`/${LINKS.playlist.route}/${playlist.id}`}
                    />
                  )
                );
              })}
            </OverlayScrollbarsComponent>
          </div>
        </>
      )}
    </BlockContainer>
  );
};

export default MediaLibrary;

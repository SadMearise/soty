import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "../../assets/css/scrollbar.css";
import { BlockContainer } from "../../containers";
import { Alert } from "../../components";
import Footer from "./Footer";
import { useOverlayScrollToTop, useScrollbar } from "../../utils/hooks";
import useAlert from "../../utils/hooks/useAlert";
import Header from "./Header";
import Main from "./Main";
import AsidePanel from "./AsidePanel";
import { SearchContextProvider } from "../../context/SearchContext";

const classes = {
  wrapper: "h-full bg-black",
  gridContainer:
    "relative grid w-full h-screen p-[8px] [grid-template-areas:'left-sidebar_main-view''now-playing-bar_now-playing-bar'] grid-rows-[1fr_auto] grid-cols-[auto_1fr]",
  gridSidebar: "[grid-area:left-sidebar] w-[306px] mr-[8px] h-full overflow-hidden",
  gridMainView: "w-full [grid-area:main-view] overflow-auto",
  gridPlayingBar: "[grid-area:now-playing-bar]",
  overlayScrollbars: "h-full scrollbar",
  headerWrapper: "sticky top-0 z-20",
  alertWrapper: "absolute right-1/2 translate-x-[50%] bottom-[102px] z-10",
};

const HomeLayout = () => {
  const { alertVisibility, alertMessage, alertSeverity, setShowError } = useAlert();
  const { scrollContainerRef } = useScrollbar();

  useOverlayScrollToTop(scrollContainerRef);

  return (
    <div className={classes.wrapper}>
      <div className={classes.gridContainer}>
        <div className={classes.gridSidebar}>
          <AsidePanel />
        </div>
        <BlockContainer styles={classes.gridMainView}>
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
            <SearchContextProvider>
              <div className={classes.headerWrapper}>
                <Header />
              </div>
              <Main />
            </SearchContextProvider>
          </OverlayScrollbarsComponent>
        </BlockContainer>
        <div className={classes.gridPlayingBar}>
          <Footer />
        </div>
        <div className={classes.alertWrapper}>
          <Alert
            message={alertMessage}
            showError={alertVisibility}
            severity={alertSeverity}
            setShowError={setShowError}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "../../assets/css/scrollbar.css";
import { BlockContainer } from "../../containers";
import Footer from "./Footer";
import { useOverlayScrollToTop, useScrollbar } from "../../utils/hooks";
import useAlert from "../../utils/hooks/useAlert";
import Header from "./Header";
import Main from "./Main";
import AsidePanel from "./AsidePanel";
import { SearchContextProvider } from "../../context/SearchContext";
import { useAppDispatch } from "../../store/hooks";
import { removeAlert } from "../../store/features/alert/alertSlice";
import { Alerts } from "../../components";

const classes = {
  wrapper: "h-full bg-black",
  gridContainer:
    "relative grid w-full h-screen p-[8px] [grid-template-areas:'left-sidebar_main-view''now-playing-bar_now-playing-bar'] grid-rows-[1fr_auto] grid-cols-[auto_1fr]",
  gridSidebar: "[grid-area:left-sidebar] w-[306px] mr-[8px] h-full overflow-hidden md-max:w-[72px]",
  gridMainView: "w-full [grid-area:main-view] overflow-auto",
  gridPlayingBar: "[grid-area:now-playing-bar]",
  overlayScrollbars: "h-full scrollbar",
  contentWrapper: "h-full flex flex-col",
  headerWrapper: "sticky top-0 z-20",
  alertWrapper: "absolute right-1/2 translate-x-[50%] bottom-[102px] z-10",
};

const HomeLayout = () => {
  const dispatch = useAppDispatch();
  const { alerts } = useAlert();

  const { scrollContainerRef } = useScrollbar();

  useOverlayScrollToTop(scrollContainerRef);

  const handleCloseAlert = (id: number) => {
    dispatch(removeAlert(id));
  };

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
            <div className={classes.contentWrapper}>
              <SearchContextProvider>
                <div className={classes.headerWrapper}>
                  <Header />
                </div>
                <Main />
              </SearchContextProvider>
            </div>
          </OverlayScrollbarsComponent>
        </BlockContainer>
        <div className={classes.gridPlayingBar}>
          <Footer />
        </div>
        <div className={classes.alertWrapper}>
          <Alerts
            alerts={alerts}
            onClose={handleCloseAlert}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;

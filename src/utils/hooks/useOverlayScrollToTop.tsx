import { OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import { RefObject, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useOverlayScrollToTop = (containerRef: RefObject<OverlayScrollbarsComponentRef>) => {
  const { pathname } = useLocation();

  useEffect(() => {
    containerRef?.current?.osInstance()?.elements().viewport.scroll({ top: 0 });
  }, [pathname, containerRef]);
};

export default useOverlayScrollToTop;

import { useRef, useEffect } from "react";

import { OverlayScrollbarsComponentRef, useOverlayScrollbars } from "overlayscrollbars-react";

const useScrollbar = () => {
  const scrollContainerRef = useRef<OverlayScrollbarsComponentRef>(null);

  const [initBodyOverlayScrollbars] = useOverlayScrollbars({
    defer: true,
    options: {
      scrollbars: {
        visibility: "auto",
        autoHide: "scroll",
      },
    },
  });

  useEffect(() => {
    initBodyOverlayScrollbars(document.body);
  }, [initBodyOverlayScrollbars]);

  return { scrollContainerRef };
};

export default useScrollbar;

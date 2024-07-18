import { useState, useEffect } from "react";

const useRouterPagination = (historyStack: string[], startedHistoryLength?: number) => {
  const [prevButtonIsDisabled, setPrevButtonIsDisabled] = useState(true);
  const [nextButtonIsDisabled, setNextButtonIsDisabled] = useState(true);

  const goBack = () => {
    window.history.back();
  };

  const goForward = () => {
    window.history.forward();
  };

  useEffect(() => {
    if (historyStack && startedHistoryLength) {
      setPrevButtonIsDisabled(window.history.state.idx === 0);
      setNextButtonIsDisabled(window.history.state.idx + startedHistoryLength === window.history.length);
    }
  }, [historyStack, startedHistoryLength]);

  return { prevButtonIsDisabled, nextButtonIsDisabled, goBack, goForward };
};

export default useRouterPagination;

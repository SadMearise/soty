import { useNavigate } from "react-router-dom";

const useRouterPagination = (startedHistoryLength: number) => {
  const navigate = useNavigate();

  const { state, length } = window.history;
  const prevButtonIsDisabled = state.idx === 0;
  const nextButtonIsDisabled = length - state.idx === startedHistoryLength;

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  return { prevButtonIsDisabled, nextButtonIsDisabled, goBack, goForward };
};

export default useRouterPagination;

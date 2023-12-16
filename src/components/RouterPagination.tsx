import { useNavigate } from "react-router-dom";
import { FC } from "react";
import Pagination from "./Pagination";
import withTooltip from "../hocs/withTooltip";
import IconButton from "./IconButton";
import { TooltipPosition } from "../utils/constants";

type RouterPaginationProps = {
  startedHistoryLength: number;
};

const RouterPagination: FC<RouterPaginationProps> = ({ startedHistoryLength }) => {
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

  const prevButton = (
    <IconButton
      action={goBack}
      disabled={prevButtonIsDisabled}
      label="pagination-prev"
    >
      <svg
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        viewBox="0 0 16 16"
      >
        <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" />
      </svg>
    </IconButton>
  );

  const nextButton = (
    <IconButton
      action={goForward}
      disabled={nextButtonIsDisabled}
      label="pagination-next"
    >
      <svg
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        viewBox="0 0 16 16"
      >
        <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z" />
      </svg>
    </IconButton>
  );

  const PrevButtonWithTooltip = withTooltip(() => {
    return prevButton;
  });
  const NextButtonWithTooltip = withTooltip(() => {
    return nextButton;
  });

  return (
    <Pagination
      prevButton={
        prevButtonIsDisabled ? (
          prevButton
        ) : (
          <PrevButtonWithTooltip
            tooltipText="Назад"
            position={TooltipPosition.Bottom}
          />
        )
      }
      nextButton={
        nextButtonIsDisabled ? (
          nextButton
        ) : (
          <NextButtonWithTooltip
            tooltipText="Вперёд"
            position={TooltipPosition.Bottom}
          />
        )
      }
    />
  );
};

export default RouterPagination;

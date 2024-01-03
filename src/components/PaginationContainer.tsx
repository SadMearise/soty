import { FC } from "react";
import Pagination from "./Pagination";
import withTooltip from "../hocs/withTooltip";
import IconButton from "./IconButton";
import { TooltipPosition } from "../utils/constants";
import Tooltip from "./Tooltip";
import useRouterPagination from "../utils/hooks/useRouterPagination";

type PaginationContainerProps = {
  startedHistoryLength: number;
};

const PaginationContainer: FC<PaginationContainerProps> = ({ startedHistoryLength }) => {
  const { prevButtonIsDisabled, nextButtonIsDisabled, goBack, goForward } = useRouterPagination(startedHistoryLength);

  const prevButton = () => {
    return (
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
  };

  const nextButton = () => {
    return (
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
  };

  const PrevButtonWithTooltip = withTooltip(prevButton, Tooltip);
  const NextButtonWithTooltip = withTooltip(nextButton, Tooltip);

  return (
    <Pagination
      prevButton={
        prevButtonIsDisabled ? (
          prevButton()
        ) : (
          <PrevButtonWithTooltip
            position={TooltipPosition.Bottom}
            tooltipText="Назад"
          />
        )
      }
      nextButton={
        nextButtonIsDisabled ? (
          nextButton()
        ) : (
          <NextButtonWithTooltip
            position={TooltipPosition.Bottom}
            tooltipText="Вперёд"
          />
        )
      }
    />
  );
};

export default PaginationContainer;

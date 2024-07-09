import { withTooltip } from "../../hocs";
import { Tooltip } from "..";
import { useRouterPagination } from "../../utils/hooks";
import TransitionButton from "./TransitionButton";
import { TooltipPosition } from "../../hocs/withTooltip/enums";
import { SESSION_STORAGE_KEYS } from "../../utils/constants";

const classes: Record<string, string> = {
  wrapper: "flex gap-[8px]",
};

const RouterPagination = () => {
  const historyStackString = sessionStorage.getItem(SESSION_STORAGE_KEYS.historyStack);
  const historyStack: string[] = historyStackString ? JSON.parse(historyStackString) : [];

  const startedHistoryLengthString = sessionStorage.getItem(SESSION_STORAGE_KEYS.startedHistoryLength);
  const startedHistoryLength = startedHistoryLengthString ? +startedHistoryLengthString : undefined;

  const { prevButtonIsDisabled, nextButtonIsDisabled, goBack, goForward } = useRouterPagination(
    historyStack,
    startedHistoryLength
  );

  const prevButton = () => (
    <TransitionButton
      onClick={goBack}
      isDisabled={prevButtonIsDisabled}
      label="previous button"
      svgId="prevArrow"
    />
  );

  const nextButton = () => (
    <TransitionButton
      onClick={goForward}
      isDisabled={nextButtonIsDisabled}
      label="next button"
      svgId="nextArrow"
    />
  );

  const PrevButtonWithTooltip = withTooltip(prevButton, Tooltip);
  const NextButtonWithTooltip = withTooltip(nextButton, Tooltip);

  return (
    <div className={classes.wrapper}>
      {prevButtonIsDisabled ? (
        prevButton()
      ) : (
        <PrevButtonWithTooltip
          position={TooltipPosition.Bottom}
          tooltipText="Назад"
        />
      )}
      {nextButtonIsDisabled ? (
        nextButton()
      ) : (
        <NextButtonWithTooltip
          position={TooltipPosition.Bottom}
          tooltipText="Вперёд"
        />
      )}
    </div>
  );
};

export default RouterPagination;

import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks";
import { Severity } from "../../types/enums";
import { selectAlerts } from "../../store/features/alert/alertSelectors";
import { addAlert, removeAlert } from "../../store/features/alert/alertSlice";

const useAlert = () => {
  const dispatch = useAppDispatch();
  const alerts = useSelector(selectAlerts);

  const displayCustomAlert = useCallback(
    (severity: Severity, message: string) => {
      const id = new Date().getTime();

      dispatch(addAlert({ id, severity, message }));

      setTimeout(() => {
        dispatch(removeAlert(id));
      }, 3000);
    },
    [dispatch]
  );

  return { alerts, displayCustomAlert };
};

export default useAlert;

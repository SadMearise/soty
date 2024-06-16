import { useSelector } from "react-redux";
import { initAlert, showAlert } from "../../store/features/alert/alertSlice";
import { useAppDispatch } from "../../store/hooks";
import { selectIsVisibility, selectMessage, selectSeverity } from "../../store/features/alert/alertSelectors";
import { Severity } from "../../types/enums";

const useAlert = () => {
  const dispatch = useAppDispatch();
  const alertVisibility = useSelector(selectIsVisibility);
  const alertMessage = useSelector(selectMessage);
  const alertSeverity = useSelector(selectSeverity);

  const setShowError = (newState: boolean) => {
    dispatch(showAlert(newState));
  };

  const displayCustomAlert = (severity: Severity, message: string) => {
    dispatch(initAlert({ severity, message }));
    dispatch(showAlert(true));
  };

  return { alertVisibility, alertMessage, alertSeverity, setShowError, displayCustomAlert };
};

export default useAlert;

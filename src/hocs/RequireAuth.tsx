import { Navigate, Outlet } from "react-router-dom";
import { LINKS, SESSION_STORAGE_KEYS } from "../utils/constants";
import { selectIsAuthenticated, selectIsAuthProgress } from "../store/features/oAuth/oAuthSelectors";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getToken } from "../store/features/oAuth/oAuthSlice";
import { Loader } from "../components";

const RequireAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthProgress = useAppSelector(selectIsAuthProgress);
  const isAuth = useAppSelector(selectIsAuthenticated);

  const initSessionHistoryLength = () => {
    if (!sessionStorage.getItem(SESSION_STORAGE_KEYS.startedHistoryLength)) {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.startedHistoryLength, `${window.history.length}`);
    }
  };

  if (isAuthProgress) {
    dispatch(getToken());

    return <Loader />;
  }

  if (isAuth) {
    initSessionHistoryLength();
    return <Outlet />;
  }

  return <Navigate to={LINKS.login.route} />;
};

export default RequireAuth;

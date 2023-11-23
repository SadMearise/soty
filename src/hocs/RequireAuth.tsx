import { Navigate, Outlet } from "react-router-dom";
import { LINKS } from "../utils/constants";
import { selectIsAuthenticated, selectIsAuthInProgress } from "../store/features/oAuth/oAuthSelectors";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { checkToken } from "../store/features/oAuth/oAuthSlice";

const RequireAuth = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuthenticated);
  const isAuthInProgress = useAppSelector(selectIsAuthInProgress);

  if (isAuthInProgress) {
    dispatch(checkToken());
  }

  if (isAuth) {
    return <Outlet />;
  }

  return <Navigate to={LINKS.login.route} />;
};

export default RequireAuth;

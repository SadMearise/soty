import { Navigate, Outlet } from "react-router-dom";
import { LINKS } from "../utils/constants";
import { selectIsAuthenticated, selectIsAuthProgress } from "../store/features/oAuth/oAuthSelectors";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getToken } from "../store/features/oAuth/oAuthSlice";
import { Loader } from "../components";

const RequireAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthProgress = useAppSelector(selectIsAuthProgress);
  const isAuth = useAppSelector(selectIsAuthenticated);

  if (isAuthProgress) {
    dispatch(getToken());

    return <Loader />;
  }

  if (isAuth) {
    return <Outlet />;
  }

  return <Navigate to={LINKS.login.route} />;
};

export default RequireAuth;

import { Navigate, Outlet } from "react-router-dom";
import { LINKS } from "../utils/constants";
import { selectIsAuthenticated, selectIsAuthProgress } from "../store/features/oAuth/oAuthSelectors";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getToken } from "../store/features/oAuth/oAuthSlice";

const RequireAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthProgress = useAppSelector(selectIsAuthProgress);
  const isAuth = useAppSelector(selectIsAuthenticated);

  if (isAuthProgress) {
    dispatch(getToken());

    return <div>loading</div>;
  }

  if (isAuth) {
    return <Outlet />;
  }

  return <Navigate to={LINKS.login.route} />;
};

export default RequireAuth;
// import { Navigate, Outlet } from "react-router-dom";
// import { LINKS } from "../utils/constants";
// import { selectIsAuthenticated, selectIsAuthProgress } from "../store/features/oAuth/oAuthSelectors";
// import { useAppSelector, useAppDispatch } from "../store/hooks";
// import { checkToken } from "../store/features/oAuth/oAuthSlice";

// const RequireAuth = () => {
//   const dispatch = useAppDispatch();
//   const isAuth = useAppSelector(selectIsAuthenticated);
//   const isAuthProgress = useAppSelector(selectIsAuthProgress);

//   if (isAuthProgress) {
//     dispatch(checkToken());
//   }

//   if (isAuth) {
//     return <Outlet />;
//   }

//   return <Navigate to={LINKS.login.route} />;
// };

// export default RequireAuth;

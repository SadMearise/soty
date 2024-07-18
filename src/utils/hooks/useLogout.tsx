import { logout } from "../../store/features/oAuth/oAuthSlice";
import { useAppDispatch } from "../../store/hooks";

const useLogout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return handleLogout;
};

export default useLogout;

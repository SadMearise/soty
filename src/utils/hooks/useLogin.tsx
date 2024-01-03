import { login } from "../../store/features/oAuth/oAuthSlice";
import { useAppDispatch } from "../../store/hooks";

const useLogin = () => {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(login());
  };

  return handleLogin;
};

export default useLogin;

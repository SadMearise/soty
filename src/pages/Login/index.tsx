import { FC } from "react";
import Header from "./Header";
import Main from "./Main";
import { useTitle } from "../../utils/hooks";

type LoginProps = {
  handleLogin: () => void;
  title: string;
};

const Login: FC<LoginProps> = ({ handleLogin, title }) => {
  useTitle(title);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Main handleLogin={handleLogin} />
    </div>
  );
};

export default Login;

import { FC } from "react";
import Header from "./Header";
import Main from "./Main";
import { useTitle } from "../../utils/hooks";

type LoginProps = {
  onLoginClick: () => void;
  title: string;
};

const classes = {
  wrapper: "flex flex-col h-screen",
};

const Login: FC<LoginProps> = ({ onLoginClick, title }) => {
  useTitle(title);

  return (
    <div className={classes.wrapper}>
      <Header />
      <Main onLoginClick={onLoginClick} />
    </div>
  );
};

export default Login;

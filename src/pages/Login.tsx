import { FC } from "react";
import LoginHeader from "../components/LoginHeader";
import PageContainer from "../components/PageContainer";
import LoginSection from "../components/LoginSection";

type LoginProps = {
  handleLogin: () => void;
};

const classes = {
  main: "h-full bg-black bg-gradient-to-b from-white/10 from-0% to-black to-100% p-8",
};

const Login: FC<LoginProps> = ({ handleLogin }) => {
  return (
    <PageContainer>
      <LoginHeader />
      <main className={classes.main}>
        <LoginSection
          animation="animate-slidedown"
          handleLogin={handleLogin}
        />
      </main>
    </PageContainer>
  );
};

export default Login;

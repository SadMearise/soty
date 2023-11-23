import { FC } from "react";
import withButtonStyles from "../hocs/withButtonStyles";
import BaseButton from "./BaseButton";

type LoginSectionProps = {
  handleLogin: () => void;
  animation?: string;
};

const Button = withButtonStyles(BaseButton);

const classes: Record<string, string> = {
  section: "h-full flex items-center justify-center",
  container: "max-w-[734px] w-full bg-black rounded-lg p-8 md-max:p-4",
  body: "max-w-[324px] w-full mx-auto text-center",
  title: "text text-white text-5xl font-bold my-12 md-max:my-4 sm-max:text-lg",
};

const LoginSection: FC<LoginSectionProps> = ({ handleLogin, animation }) => {
  return (
    <section className={`${classes.section} ${animation}`}>
      <div className={classes.container}>
        <div className={classes.body}>
          <h1 className={classes.title}>Войти в Soty</h1>
          <Button
            variant="default-green"
            width="full"
            label="login"
            action={handleLogin}
          >
            Войти
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;

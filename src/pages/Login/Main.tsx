import { FC } from "react";
import { PROJECT_NAME } from "../../utils/constants";
import { Button } from "../../components";

type MainProps = {
  onLoginClick: () => void;
};

const classes: Record<string, string> = {
  main: "h-full bg-black bg-gradient-to-b from-white/10 from-0% to-black to-100% p-8",
  section: "h-full flex items-center justify-center animate-slidedown",
  container: "max-w-[734px] w-full bg-black rounded-[8px] p-8 md-max:p-4",
  body: "max-w-[324px] w-full mx-auto text-center",
  title: "text text-white text-5xl font-bold my-12 md-max:my-4 sm-max:text-lg",
  button: "btn btn-default-green w-full",
};

const Main: FC<MainProps> = ({ onLoginClick }) => (
  <main className={classes.main}>
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.body}>
          <h1 className={classes.title}>Войти в {PROJECT_NAME}</h1>
          <Button
            as="button"
            className={classes.button}
            aria-label="login"
            type="button"
            onClick={onLoginClick}
          >
            Войти
          </Button>
        </div>
      </div>
    </section>
  </main>
);

export default Main;

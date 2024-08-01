import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "../../components";
import FooterInfo from "./FooterInfo";

const classes = {
  main: "flex flex-col h-full justify-between",
  contentWrapper: "flex-[1_0_auto]",
  footerInfoWrapper: "flex-[0_0_auto]",
};

const Main = () => {
  return (
    <main className={classes.main}>
      <ErrorBoundary>
        <div className={classes.contentWrapper}>
          <Outlet />
        </div>
        <div className={classes.footerInfoWrapper}>
          <FooterInfo />
        </div>
      </ErrorBoundary>
    </main>
  );
};

export default Main;

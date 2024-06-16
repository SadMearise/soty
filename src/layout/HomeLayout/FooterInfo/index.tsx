import { Container } from "../../../containers";
import { PROJECT_NAME } from "../../../utils/constants";
import BottomLinks from "./BottomLinks";
import SocialsList from "./SocialsList";
import TopCols from "./TopCols";

const classes = {
  wrapper: "pb-[40px]",
  top: "flex justify-between mb-[24px] pb-[40px] border-b border-solid border-dark-400",
  bottom: "flex items-start justify-between pt-[16px]",
  bottomCopy: "flex-[0_0_auto]",
  bottomText: "relative text-sm font-normal text-grey-100",
};

const FooterInfo = () => {
  return (
    <Container>
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <TopCols />
          <SocialsList />
        </div>
        <div className={classes.bottom}>
          <BottomLinks />
          <div className={classes.bottomCopy}>
            <p className={classes.bottomText}>
              © {new Date().getFullYear()} {PROJECT_NAME} AB
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FooterInfo;

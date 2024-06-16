import { Button } from "../../../components";
import { BOTTOM_LINKS } from "./constants";

const classes = {
  bottom: "flex items-start justify-between pt-[16px]",
  links: "flex flex-wrap gap-x-[16px] gap-y-[8px]",
  bottomText: "relative text-sm font-normal text-grey-100",
  hoverLink: "hover:text-white group",
  underline: "after-underline",
};

const BottomLinks = () => {
  return (
    <div className={classes.links}>
      {BOTTOM_LINKS.map((link, index) => (
        <Button
          as="link"
          href={link.href}
          target="_blank"
          styles={`${classes.bottomText} ${classes.hoverLink} ${classes.underline}`}
          key={index}
        >
          {link.text}
        </Button>
      ))}
    </div>
  );
};

export default BottomLinks;

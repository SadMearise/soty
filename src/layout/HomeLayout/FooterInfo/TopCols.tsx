import { TOP_COLS } from "./constants";
import { Button } from "../../../components";

const classes = {
  col: "mr-[24px] w-[20%]",
  colTitle: "text-base font-bold text-white",
  topListItem: "leading-4 text-base mt-[16px]",
  link: "relative text-inherit font-normal text-grey-100",
  hoverLink: "hover:text-white group",
  underline: "after-underline",
};

const TopCols = () => {
  return TOP_COLS.map((col, index) => (
    <div
      className={classes.col}
      key={index}
    >
      <p className={classes.colTitle}>{col.title}</p>
      <ul>
        {col.links.map((link, index) => (
          <li
            className={classes.topListItem}
            key={index}
          >
            <Button
              as="link"
              href={link.href}
              target="_blank"
              styles={`${classes.link} ${classes.hoverLink} ${classes.underline}`}
            >
              {link.text}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  ));
};

export default TopCols;

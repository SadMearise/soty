import { FC } from "react";
import { Link } from "react-router-dom";

type SectionH3TitleProps = {
  title: string;
  route?: string;
};

const classes = {
  title: "font-bold text-2xl text-white truncate",
  titleHover: "hover:underline",
};

const SectionH3Title: FC<SectionH3TitleProps> = ({ title, route }) => {
  return route ? (
    <h3 className={`${classes.title} ${classes.titleHover}`}>
      <Link
        to={route}
        state={{ title }}
      >
        {title}
      </Link>
    </h3>
  ) : (
    <h3 className={classes.title}>{title}</h3>
  );
};

export default SectionH3Title;

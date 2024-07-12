import { FC } from "react";
import { Link } from "react-router-dom";
import { LINKS, PROJECT_NAME } from "../utils/constants";

type LogoProps = {
  logoSrc: string;
  size?: "xs" | "sm" | "md";
  isTitle?: boolean;
};

const classes: Record<string, string> = {
  logo: "flex items-center gap-[4px]",
  image: "h-auto",
  text: "text-white",
};

const sizes: Record<string, string> = {
  xs: "w-6",
  sm: "w-9",
  md: "w-[60px] md-max:w-6",
};

const Logo: FC<LogoProps> = ({ logoSrc, size = "sm", isTitle = true }) => (
  <Link
    className={classes.logo}
    to={LINKS.home.route}
  >
    <img
      className={`${classes.image} ${sizes[size]}`}
      alt="logo"
      src={logoSrc}
    />
    {isTitle && <span className={classes.text}>{PROJECT_NAME}</span>}
  </Link>
);

export default Logo;

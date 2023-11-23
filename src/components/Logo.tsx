import { FC } from "react";
import { Link } from "react-router-dom";
import { LINKS } from "../utils/constants";

type LogoProps = {
  size?: string;
  isTitle?: boolean;
};

const classes: Record<string, string> = {
  logo: "flex items-center gap-1",
  image: "h-auto",
  text: "text-white",
};

const sizeStyles: Record<string, string> = {
  xs: "w-6",
  sm: "w-9",
  md: "w-[60px] md-max:w-6",
};

const Logo: FC<LogoProps> = ({ size = "sm", isTitle = true }) => {
  return (
    <Link
      className={classes.logo}
      to={LINKS.home.route}
    >
      <img
        className={`${classes.image} ${sizeStyles[size]}`}
        alt="logo"
        src="/images/logo.png"
      />
      {isTitle && <span className={classes.text}>Soty</span>}
    </Link>
  );
};

export default Logo;

import { FC } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components";
import { LINKS } from "../utils/constants";
import { useTitle } from "../utils/hooks";

type ErrorProps = {
  title: string;
  text?: string;
  link?: {
    route: string;
    text: string;
  };
};

const classes = {
  content:
    "md-max:h-full md-min:absolute md-min:left-1/2 md-min:top-1/2 p-8 md-min:translate-x-[-50%] md-min:translate-y-[-50%]",
  logoWrapper: "flex justify-center md-max:justify-end",
  infoContainer:
    "text-center md-max:absolute md-max:left-1/2 md-max:top-1/2 p-8 md-max:translate-x-[-50%] md-max:translate-y-[-50%]",
  title: "text-5xl font-bold tracking-[-0.04em] mb-4 md-max:text-lg md-max:mb-2",
  text: "text-grey-100 font-normal text-base mb-10 md-max:text-xs md-max:mb-4",
  link: "btn btn-big-white",
};

const Error: FC<ErrorProps> = ({ title, text, link }) => {
  useTitle(LINKS.error.title);

  return (
    <div className={classes.content}>
      <div className={classes.logoWrapper}>
        <Logo
          isTitle={false}
          size="md"
        />
      </div>
      <div className={classes.infoContainer}>
        <h1 className={classes.title}>{title}</h1>
        {text && <p className={classes.text}>{text}</p>}
        {link && (
          <Link
            to={link.route}
            className={classes.link}
          >
            {link.text}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Error;

import LinkButton from "../components/LinkButton";
import Logo from "../components/Logo";
import withButtonStyles from "../hocs/withButtonStyles";
import { LINKS } from "../utils/constants";

const Link = withButtonStyles(LinkButton);

const classes = {
  content:
    "md-max:h-full md-min:absolute md-min:left-1/2 md-min:top-1/2 p-8 md-min:translate-x-[-50%] md-min:translate-y-[-50%]",
  "logo-wrapper": "flex justify-center md-max:justify-end md-min:mb-10",
  "info-container":
    "text-center md-max:absolute md-max:left-1/2 md-max:top-1/2 p-8 md-max:translate-x-[-50%] md-max:translate-y-[-50%]",
  title: "text-5xl font-bold tracking-[-0.04em] mb-4 md-max:text-lg md-max:mb-2",
  text: "text-grey font-normal text-base mb-10 md-max:text-xs md-max:mb-4",
};

const Error = () => {
  return (
    <div className={classes.content}>
      <div className={classes["logo-wrapper"]}>
        <Logo
          isTitle={false}
          size="md"
        />
      </div>
      <div className={classes["info-container"]}>
        <h1 className={classes.title}>Страница не найдена</h1>
        <p className={classes.text}>Мы не нашли нужную страницу.</p>
        <Link
          variant="big-white"
          href={LINKS.home.route}
          tabIndex={0}
        >
          Главная
        </Link>
      </div>
    </div>
  );
};

export default Error;

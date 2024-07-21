import { BlockContainer } from "../../../containers";
import { Logo, SvgGenerator } from "../../../components";
import { NavigationItem } from "./types";
import Navigation from "./Navigation";
import { LINKS } from "../../../utils/constants";
import MediaLibrary from "./MediaLibrary";
import { LogoSizes } from "../../../components/enums";

const classes = {
  aside: "flex flex-col gap-[8px] h-full",
  logoContainer: "p-[24px] md-max:px-[24px] md-max:py-[12px]",
  logoWrapper: "mb-3 md-max:hidden",
  navigateIcon: "w-6 h-auto",
};

const navigationItems: NavigationItem[] = [
  {
    name: "Главная",
    route: LINKS.home.route,
    label: "home",
    icon: (
      <SvgGenerator
        id="home"
        className={classes.navigateIcon}
        size="24px"
      />
    ),
  },
  {
    name: "Поиск",
    route: LINKS.search.route,
    label: "search",
    icon: (
      <SvgGenerator
        id="search"
        className={classes.navigateIcon}
        size="24px"
      />
    ),
  },
];

const AsidePanel = () => {
  return (
    <aside className={classes.aside}>
      <BlockContainer styles={classes.logoContainer}>
        <div className={classes.logoWrapper}>
          <Logo
            logoSrc="./images/logo.png"
            size={LogoSizes.Xs}
          />
        </div>
        <Navigation navigationItems={navigationItems} />
      </BlockContainer>
      <MediaLibrary />
    </aside>
  );
};

export default AsidePanel;

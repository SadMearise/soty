import { BlockContainer } from "../../../containers";
import { Logo, SvgGenerator } from "../../../components";
import { NavigationItem } from "./types";
import Navigation from "./Navigation";
import { LINKS } from "../../../utils/constants";
import MediaLibrary from "./MediaLibrary";

const classes = {
  aside: "flex flex-col gap-[8px] h-full",
  logoContainer: "p-6",
  logoWrapper: "mb-3",
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
            logoSrc="/images/logo.png"
            size="xs"
          />
        </div>
        <Navigation navigationItems={navigationItems} />
      </BlockContainer>
      <MediaLibrary />
    </aside>
  );
};

export default AsidePanel;

import { BlockContainer } from "../../../containers";
import { Logo, SvgGenerator } from "../../../components";
import { NavigationItem } from "./types";
import Navigation from "./Navigation";
import { LINKS } from "../../../utils/constants";

const classes = {
  aside: "flex flex-col w-[306px] gap-[8px] mr-[8px]",
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
      <BlockContainer styles="p-6">
        <div className={classes.logoWrapper}>
          <Logo size="xs" />
        </div>
        <Navigation navigationItems={navigationItems} />
      </BlockContainer>
      <BlockContainer styles="h-full">Медиатека</BlockContainer>
    </aside>
  );
};

export default AsidePanel;

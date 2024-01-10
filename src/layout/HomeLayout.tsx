import { Outlet } from "react-router-dom";
import BlockContainer from "../components/BlockContainer";
import Container from "../components/Container";
import LinkButton from "../components/LinkButton";
import Logo from "../components/Logo";
import PaginationContainer from "../components/PaginationContainer";
import { LINKS, TooltipPosition } from "../utils/constants";
import ProfileButtonWithTooltip from "../components/ProfileButtonWithTooltip";
import DropdownMenu from "../components/DropdownMenu";
import useUsername from "../utils/hooks/useUsername";
import useLogout from "../utils/hooks/useLogout";
import { ProfileMenuItem } from "../models";

const navigateItems = [
  { name: "Главная", route: LINKS.home.route, label: "home", icon: "/icons/home.svg" },
  { name: "Поиск", route: LINKS.search.route, label: "search", icon: "/icons/search.svg" },
];

const HomeLayout = () => {
  const handleLogout = useLogout();
  const menuItems: ProfileMenuItem[] = [
    { name: "Профиль", href: LINKS.profile.route },
    {
      name: "Выйти",
      onClick: handleLogout,
    },
  ];

  const { length, state } = window.history;
  const startedHistoryLength = state.idx === 0 ? length : length - state.idx;

  return (
    <div className="h-full bg-black">
      <Container>
        <div className="flex">
          <aside className="w-[306px]">
            <BlockContainer>
              <div className="p-6">
                <div className="mb-3">
                  <Logo size="xs" />
                </div>
                <nav>
                  <ul>
                    {navigateItems.map((item) => {
                      return (
                        <li
                          key={item.name}
                          className="mb-2 last:mb-0"
                        >
                          <LinkButton
                            href={item.route}
                            styles="flex items-center gap-5 py-2"
                          >
                            <img
                              className="w-6 h-auto"
                              alt={item.label}
                              src={item.icon}
                            />
                            <span className="font-bold text-base text-grey-100">{item.name}</span>
                          </LinkButton>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </BlockContainer>
            <BlockContainer>Медиатека</BlockContainer>
          </aside>

          <BlockContainer styles="w-full">
            <main className="">
              <header className="flex justify-between items-center px-6 py-[7px] bg-black/50">
                <PaginationContainer startedHistoryLength={startedHistoryLength} />
                <DropdownMenu
                  buttonElement={
                    <ProfileButtonWithTooltip
                      position={TooltipPosition.Bottom}
                      username={useUsername()}
                    />
                  }
                  menuItems={menuItems}
                />
              </header>
              <Outlet />
            </main>
          </BlockContainer>
        </div>
      </Container>
    </div>
  );
};

export default HomeLayout;

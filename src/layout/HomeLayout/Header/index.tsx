import { useLocation } from "react-router-dom";
import { ProfileMenu, RouterPagination } from "../../../components";
import { LINKS } from "../../../utils/constants";
import SearchController from "./SearchController";

const classes = {
  header: "flex items-center h-[64px] px-6 py-[7px] bg-black/50",
  searchBarWrapper: "flex-[0_1_364px] mx-[8px]",
  profile: "ml-auto",
};

const Header = () => {
  const location = useLocation();

  return (
    <header className={classes.header}>
      <RouterPagination />
      {location.pathname.startsWith(`/${LINKS.search.route}`) && (
        <div className={classes.searchBarWrapper}>
          <SearchController />
        </div>
      )}
      <div className={classes.profile}>
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;

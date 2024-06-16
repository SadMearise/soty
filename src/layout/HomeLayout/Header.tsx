import { ProfileMenu, RouterPagination } from "../../components";

const classes = {
  header: "flex justify-between items-center px-6 py-[7px] bg-black/50",
};

const Header = () => {
  return (
    <header className={classes.header}>
      <RouterPagination />
      <ProfileMenu />
    </header>
  );
};

export default Header;

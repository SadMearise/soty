import Logo from "../components/Logo";

const classes = {
  container: "bg-black px-[52px] py-8",
};

const Header = () => {
  return (
    <div className={classes.container}>
      <Logo />
    </div>
  );
};

export default Header;

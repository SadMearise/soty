import { Logo } from "../../components";

const classes = {
  container: "bg-black px-[52px] py-8",
};

const Header = () => (
  <div className={classes.container}>
    <Logo />
  </div>
);

export default Header;

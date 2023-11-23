import Logo from "./Logo";

const classes = {
  container: "bg-black px-[52px] py-8",
};

const LoginHeader = () => {
  return (
    <div className={classes.container}>
      <Logo />
    </div>
  );
};

export default LoginHeader;

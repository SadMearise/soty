const classes = {
  wrapper: "flex justify-center items-center h-screen",
  items: "flex space-x-2",
  item: "w-3 h-3 bg-green-100 rounded-full",
};

const Loader = () => (
  <div className={classes.wrapper}>
    <div className={classes.items}>
      <div className={`${classes.item} animate-firstBounce`} />
      <div className={`${classes.item} animate-secondBounce`} />
      <div className={`${classes.item} animate-thirdBounce`} />
    </div>
  </div>
);

export default Loader;

const classes = {
  wrapper: "text-center color-white pt-[15%] pb-[15%]",
  title: "text-2xl font-bold",
  descriptionWrapper: "flex flex-col gap-[6px] text-base pt-[10px] pb-[30px] px-4",
};

const ContentRestricted = () => {
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>Content Restricted</h3>
      <div className={classes.descriptionWrapper}>
        <p>
          We apologize, but the content you are trying to access is currently restricted due to limited access to the
          original source.
        </p>
        <p>Thank you for your understanding.</p>
      </div>
    </div>
  );
};

export default ContentRestricted;

const classes = {
  wrapper: "text-center color-white pt-[15%]",
  title: "text-2xl font-bold",
  description: "text-base pt-[10px] pb-[30px]",
};

const NoResultsMessage = () => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>По вашему запросу ничего не найдено</h1>
      <p className={classes.description}>Проверь, нет ли опечаток, сократи запрос или перефразируй его.</p>
    </div>
  );
};

export default NoResultsMessage;

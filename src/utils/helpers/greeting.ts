const greeting = () => {
  const currentTime = new Date();
  const hour = currentTime.getHours();

  let greeting;

  if (hour >= 6 && hour < 12) {
    greeting = "Доброе утро";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Добрый день";
  } else if (hour >= 18 && hour < 24) {
    greeting = "Добрый вечер";
  } else {
    greeting = "Доброй ночи";
  }

  return greeting;
};

export default greeting;

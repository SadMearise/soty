export const greeting = () => {
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

const milisecsToSecs = (milisecs: number) => Math.floor(milisecs / 1000);
const milisecsToMins = (milisecs: number) => Math.floor(milisecs / 60000);
const milisecsToHours = (milisecs: number) => Math.floor(milisecs / 3600000);

export const getAlbumDuration = (milisecs: number) => {
  const secs = milisecsToSecs(milisecs);
  const mins = milisecsToMins(milisecs);
  const hours = milisecsToHours(milisecs);

  if (mins === 0) {
    return `${secs} сек.`;
  }

  if (mins < 60) {
    return `${mins} мин. ${secs % (60 * mins)} сек.`;
  }

  return `${hours} ч. ${mins % (hours * 60)} мин. ${secs % (60 * mins)} сек.`;
};

export const getTrackTime = (milisecs: number) => {
  if (milisecs <= 0) return "0:00";

  const secs = milisecsToSecs(milisecs);

  const mins = milisecsToMins(milisecs);

  const resSecs = mins > 0 ? secs % (60 * mins) : secs;

  return `${mins}:${resSecs <= 9 ? `0${resSecs}` : resSecs}`;
};

export const getAlbumReleaseDate = ([year, month, day]: string[]) => {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  return `${day} ${months[+month + -1]} ${year} г.`;
};

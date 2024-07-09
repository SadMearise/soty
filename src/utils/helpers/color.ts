export const getRandomRGBColor = (defaultR?: number, defaultG?: number, defaultB?: number) => {
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const r = getRandomInt(255);
  const g = getRandomInt(255);
  const b = getRandomInt(255);

  return `rgb(${defaultR ?? r},${defaultG ?? g},${defaultB ?? b})`;
};

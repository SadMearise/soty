export const getDeclension = (count: number, endings: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2];

  return `${count} ${endings[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]]}`;
};

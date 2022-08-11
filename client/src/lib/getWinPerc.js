function getWinPerc(wins, matches) {
  if (matches === 0) return 0;
  return Math.round((wins / matches) * 100);
}

export default getWinPerc;

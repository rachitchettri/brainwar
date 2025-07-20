export function calculateElo(winnerElo: number, loserElo: number): [number, number] {
    const K = 32;
    const expectedWin = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
    const winnerNew = winnerElo + K * (1 - expectedWin);
    const loserNew = loserElo + K * (0 - (1 - expectedWin));
    return [Math.round(winnerNew), Math.round(loserNew)];
  }
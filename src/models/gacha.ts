export enum GachaRates {
  FIVESTAR = 0.02,
  FOURSTAR = 0.06,
  THREESTAR = 0.12,
  TWOSTAR = 0.3,
  ONESTAR = 0.5,
}

export const gachaArray = [
  GachaRates.ONESTAR,
  GachaRates.TWOSTAR,
  GachaRates.THREESTAR,
  GachaRates.FOURSTAR,
  GachaRates.FIVESTAR,
];

export function getCardRarity(x: number) {
  if (x < gachaArray[0] * 100) {
    return 1;
  } else if (x < gachaArray.slice(0, 2).reduce((pv, cv) => pv + cv, 0) * 100) {
    return 2;
  } else if (x < gachaArray.slice(0, 3).reduce((pv, cv) => pv + cv, 0) * 100) {
    return 3;
  } else if (x < gachaArray.slice(0, 4).reduce((pv, cv) => pv + cv, 0) * 100) {
    return 4;
  } else {
    return 5;
  }
}

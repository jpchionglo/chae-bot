export interface Photocard {
  name: string;
  imageUrl: string;
  cost: number;
  rarity: number;
  era: string;
  set: number;
}

export interface DatabaseModel {
  dataValues: Photocard;
}

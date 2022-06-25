import { ButtonCommand, Command, ModalCommand } from "./Command";
import { addbalance } from "./commands/addbalance";
import { addcard } from "./commands/addcard";
import { balance } from "./commands/balance";
import { daily } from "./commands/daily";
import { deletecard } from "./commands/deletecard";
import { michaeng } from "./commands/michaeng";
import { ping } from "./commands/ping";
import { pricecard } from "./commands/pricecard";
import { viewcard } from "./commands/viewcard";
import { work } from "./commands/work";
import { addCardToDatabase } from "./commands/addPhotoCard";
import { deletePhotoCard } from "./commands/deletePhotoCard";

export const Commands: Command[] = [
  ping,
  michaeng,
  addcard,
  viewcard,
  pricecard,
  balance,
  addbalance,
  daily,
  work,
  deletecard,
];
export const ModalCommands: ModalCommand[] = [addCardToDatabase];

export const ButtonCommands: ButtonCommand[] = [deletePhotoCard];

import { Command, ModalCommand } from "./Command";
import { addbalance } from "./commands/addbalance";
import { addcard } from "./commands/addcard";
import { balance } from "./commands/balance";
import { daily } from "./commands/daily";
import { michaeng } from "./commands/michaeng";
import { ping } from "./commands/ping";
import { pricecard } from "./commands/pricecard";
import { viewcard } from "./commands/viewcard";
import { work } from "./commands/work";
import { addCardToDatabase } from "./modalcommands/addPhotoCard";

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
];
export const ModalCommands: ModalCommand[] = [addCardToDatabase];

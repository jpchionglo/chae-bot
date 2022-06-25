import { ButtonCommand, Command, ModalCommand } from "./Command";
import { addbalance } from "./commands/addbalance";
import { addcard } from "./commands/addcard";
import { balance } from "./commands/balance";
import { daily } from "./commands/daily";
import { deletecard } from "./commands/deletecard";
import { michaeng } from "./commands/michaeng";
import { ping } from "./commands/ping";
import { viewcard } from "./commands/viewcard";
import { work } from "./commands/work";
import { deletePhotoCard } from "./commands/deletePhotoCard";
import { editcard } from "./commands/editcard";
import { removebalance } from "./commands/removebalance";

export const Commands: Command[] = [
  ping,
  michaeng,
  addcard,
  viewcard,
  balance,
  addbalance,
  daily,
  work,
  deletecard,
  editcard,
  removebalance
];

export const ButtonCommands: ButtonCommand[] = [deletePhotoCard];

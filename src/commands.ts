import { Command, ModalCommand } from "./Command";
import { addcard } from "./commands/addcard";
import { michaeng } from "./commands/michaeng";
import { ping } from "./commands/ping";
import { pricecard } from "./commands/pricecard";
import { viewcard } from "./commands/viewcard";
import { addCardToDatabase } from "./modalcommands/addPhotoCard";

export const Commands: Command[] = [ping, michaeng, addcard, viewcard, pricecard];
export const ModalCommands: ModalCommand[] = [addCardToDatabase];
import { BaseCommandInteraction, ChatInputApplicationCommandData, Client, ModalSubmitInteraction } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: BaseCommandInteraction) => void;
}

export interface ModalCommand extends ChatInputApplicationCommandData {
    run: (interaction: ModalSubmitInteraction) => void;
}
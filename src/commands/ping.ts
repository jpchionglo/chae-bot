import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

export const ping: Command = {
    name: "ping",
    description: "Replies back with Pong!",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = "Pong!";

        await interaction.reply({
            ephemeral: true,
            content
        });
    }
};
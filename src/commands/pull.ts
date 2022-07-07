import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

export const pull: Command = {
    name: "pull",
    description: "Pulls an amount of cards randomly",
    type: "CHAT_INPUT",
    options: [
        {
          type: "INTEGER",
          name: "amount",
          description: "Amount of cards to pull",
          required: true,
        },
      ],
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = "Pong!";

        await interaction.reply({
            ephemeral: true,
            content
        });
    }
};
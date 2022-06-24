import { BaseCommandInteraction, Client, MessageEmbed } from "discord.js";
import { Command } from "../Command";

export const michaeng: Command = {
  name: "michaeng",
  description: "Sends a lovely gif :)",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    await interaction.reply(
      "https://c.tenor.com/kLGlnl0Pm04AAAAM/twice-funny.gif"
    );
  },
};

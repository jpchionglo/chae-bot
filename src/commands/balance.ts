import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";
import { Users } from "../database/users";

const { Modal, TextInputComponent } = require("discord.js");

export const balance: Command = {
  name: "balance",
  description: "Checks your balance",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const user = await Users.findOne({
      where: { userId: interaction.user.id },
    });

    if (user) {
      await interaction.reply(`${user.get("balance")} \`\`💎\`\` `);
    } else {
      await interaction.reply("User not registered.");
    }
  },
};

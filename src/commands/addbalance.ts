import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";
import { Users } from "../database/users";

const { Modal, TextInputComponent } = require("discord.js");

export const addbalance: Command = {
  name: "addbalance",
  description: "Adds set amount to your or someone else's balance",
  type: "CHAT_INPUT",
  options: [
    {
      type: "INTEGER",
      name: "diamonds",
      description: "Amount of diamonds to add",
      required: true,
    },
    {
      type: "USER",
      name: "user",
      description: "User to transfer diamonds to",
      required: false,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const diamonds = interaction.options.get("diamonds")?.value;
    const targetUserId = interaction.options.get("user")
      ? interaction.options.get("user")?.value
      : interaction.user.id;
    let targetUser = await Users.findOne({ where: { userId: targetUserId } });

    try {
      if (targetUser) {
        Users.increment("balance", {
          by: diamonds,
          where: { userId: targetUserId },
        });
        targetUser = await Users.findOne({ where: { userId: targetUserId } });
        await interaction.reply(
          `Added ${diamonds} \`\`💎\`\` to <@${targetUserId}>. Their current balance: ${targetUser.get(
            "balance"
          )} \`\`💎\`\` `
        );
      } else {
        await interaction.reply("User does not have a balance yet.");
      }
    } catch {
      await interaction.reply("An error occured adding a balance.");
    }
  },
};

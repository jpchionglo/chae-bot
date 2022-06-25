import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";
import { Users } from "../database/users";

export const removebalance: Command = {
  name: "removebalance",
  description: "Removes set amount from your or someone else's balance",
  type: "CHAT_INPUT",
  options: [
    {
      type: "INTEGER",
      name: "diamonds",
      description: "Amount of diamonds to remove",
      required: true,
    },
    {
      type: "USER",
      name: "user",
      description: "User remove diamonds from",
      required: false,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const targetUserId = interaction.options.get("user")
      ? interaction.options.get("user")?.value
      : interaction.user.id;
    let targetUser = await Users.findOne({ where: { userId: targetUserId } });
    let diamonds = Number(interaction.options.get("diamonds")?.value);
    diamonds =
      0 -
      (diamonds > targetUser.get("balance")
        ? targetUser.get("balance")
        : diamonds);

    try {
      if (targetUser) {
        Users.increment("balance", {
          by: diamonds,
          where: { userId: targetUserId },
        });
        targetUser = await Users.findOne({ where: { userId: targetUserId } });
        await interaction.reply(
          `Removed **${
            0 - diamonds
          }** \`\`💎\`\` from <@${targetUserId}>. Their current balance: **${targetUser.get(
            "balance"
          )}** \`\`💎\`\` `
        );
      } else {
        await interaction.reply("User does not have a balance yet.");
      }
    } catch {
      await interaction.reply("An error occured removing a balance.");
    }
  },
};

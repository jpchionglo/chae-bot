import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";
import { Work } from "../database/work";
import { Users } from "../database/users";

export const daily: Command = {
  name: "daily",
  description: "Adds 50 diamonds to your account once per day",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const daily = await Work.findOne({
      where: { userid: interaction.user.id },
    });
    let currentDay = new Date(interaction.createdAt).getUTCDate();

    try {
      if (daily && daily.get("lastDaily") == currentDay) {
        await interaction.reply("You've already done the daily for today.");
      } else {
        if (!daily) {
          await Work.create({
            userId: interaction.user.id,
            lastDaily: currentDay,
          });
        } else {
          await Work.update(
            { lastDaily: currentDay },
            { where: { userId: interaction.user.id } }
          );
        }
        Users.increment("balance", {
          by: 50,
          where: { userId: interaction.user.id },
        });

        const targetUser = await Users.findOne({
          where: { userId: interaction.user.id },
        });

        await interaction.reply(
          `Added 50 \`\`💎\`\` to <@${
            interaction.user.id
          }>. Current balance: ${targetUser.get("balance")} \`\`💎\`\` `
        );
      }
    } catch (error) {
      console.log(error);
      await interaction.reply("An error occured adding a balance (daily).");
    }
  },
};

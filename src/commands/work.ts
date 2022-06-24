import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";
import { Work } from "../database/work";
import { Users } from "../database/users";

export const work: Command = {
  name: "work",
  description: "Work to add 10 diamonds to your account every 20 minutes",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const work = await Work.findOne({
      where: { userid: interaction.user.id },
    });
    let currentMinutes = new Date(interaction.createdAt).getUTCMinutes();

    try {
      if (work && minutesSinceWork(currentMinutes, work.get("lastWork")) < 20) {
        await interaction.reply(
          `Too tired. You can work again in ${
            20 - minutesSinceWork(currentMinutes, work.get("lastWork"))
          } minutes.`
        );
      } else {
        if (!work) {
          await Work.create({
            userId: interaction.user.id,
            lastWork: currentMinutes,
          });
        } else {
          await Work.update(
            { lastWork: currentMinutes },
            { where: { userId: interaction.user.id } }
          );
        }
        Users.increment("balance", {
          by: 10,
          where: { userId: interaction.user.id },
        });

        const targetUser = await Users.findOne({
          where: { userId: interaction.user.id },
        });

        await interaction.reply(
          `Worked to add 10 \`\`💎\`\` to <@${
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

function minutesSinceWork(
  currentMinute: number,
  lastWorkMinute: number
): number {
  const difference = currentMinute - lastWorkMinute;
  if (difference >= 0) {
    return difference;
  } else {
    return 60 + difference;
  }
}

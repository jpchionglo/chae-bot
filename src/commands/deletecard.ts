import {
  BaseCommandInteraction,
  Client,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from "discord.js";
import { Command } from "../Command";
import { Photocards } from "../database/photocards";

export const deletecard: Command = {
  name: "deletecard",
  description: "Deletes a card",
  type: "CHAT_INPUT",
  options: [
    {
      type: "STRING",
      name: "name",
      description: "Name of card to delete",
      required: true,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const photocardName = interaction.options.get("name")?.value;
    const photocard = await Photocards.findOne({
      where: { name: photocardName },
    });

    if (photocard) {
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("deletePhotoCard")
          .setLabel("Delete")
          .setStyle("DANGER")
      );
      const embed = new MessageEmbed()
        .setColor("#0E86D4")
        .setTitle(photocard.get("name"))
        .setURL(photocard.get("imageUrl"))
        .addFields(
          { name: "Era", value: photocard.get("era") },
          { name: "Set", value: String(photocard.get("set")), inline: true },
          {
            name: "Rarity",
            value: String(photocard.get("rarity")),
            inline: true,
          },
          { name: "Cost", value: String(photocard.get("cost")), inline: true }
        )
        .setImage(photocard.get("imageUrl"))
        .setTimestamp();

      await interaction.reply({
        content: "**ARE YOU SURE YOU WANT TO DELETE THIS CARD?**",
        embeds: [embed],
        components: [row],
      });
    } else {
      await interaction.reply("Photocard not found.");
    }
  },
};

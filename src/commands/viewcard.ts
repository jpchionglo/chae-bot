import { BaseCommandInteraction, Client, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import { Photocards } from "../database/photocards";

const { Modal, TextInputComponent } = require("discord.js");

export const viewcard: Command = {
  name: "viewcard",
  description: "Views a card",
  type: "CHAT_INPUT",
  options: [
    {
      type: "STRING",
      name: "name",
      description: "Name of card to change price",
      required: true,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const photocardName = interaction.options.get("name")?.value;
    const photocard = await Photocards.findOne({
      where: { name: photocardName },
    });

    if (photocard) {
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

      await interaction.reply({ embeds: [embed] });
    } else {
      await interaction.reply("Photocard not found.");
    }
  },
};

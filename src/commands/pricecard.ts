import {
  BaseCommandInteraction,
  Client,
} from "discord.js";
import { Command } from "../Command";
import { Photocards } from "../database/photocards";

export const pricecard: Command = {
  name: "pricecard",
  description: "Changes a card's price",
  type: "CHAT_INPUT",
  options: [
    {
      type: "STRING",
      name: "title",
      description: "Title of card to change price",
      required: true,
    },
    {
      type: "STRING",
      name: "price",
      description: "Price of card to change to",
      required: true,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const cardTitle = interaction.options.get("title")?.value;
    const cardPrice = Number(interaction.options.get("price")?.value);

    if (isNaN(cardPrice)) {
      await interaction.reply("Please enter a number.");
    } else {
      const affectedRows = await Photocards.update(
        { cost: cardPrice },
        { where: { name: cardTitle } }
      );

      if (affectedRows > 0) {
        await interaction.reply(`Photocard "${cardTitle}" cost updated to ${cardPrice}.`);
      } else {
        await interaction.reply(`Could not find card name "${cardTitle}".`);
      }
    }
  },
};

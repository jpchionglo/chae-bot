import { ModalSubmitInteraction } from "discord.js";
import { ModalCommand } from "../Command";
import { Photocards } from "../database/photocards";

export const addCardToDatabase: ModalCommand = {
  name: "addCardToDatabase",
  description: "Adds a photocard to the database",
  type: "CHAT_INPUT",
  run: async (interaction: ModalSubmitInteraction) => {
    const title = interaction.fields.getTextInputValue("titleInput");
    const imageUrl = interaction.fields.getTextInputValue("imageUrlInput");
    const rarity = interaction.fields.getTextInputValue("rarityInput");
    const era = interaction.fields.getTextInputValue("eraInput");
    const set = interaction.fields.getTextInputValue("setInput");

    try {
      const photocard = await Photocards.create({
        name: title,
        imageUrl,
        cost: 0,
        rarity,
        era,
        set,
      });

      return interaction.reply(`Card ${photocard.name} added!`);
    } catch (error: any) {
      console.log(error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return interaction.reply("That photocard already exists.");
      }

      return interaction.reply("Something went wrong with adding a photocard.");
    }
  },
};

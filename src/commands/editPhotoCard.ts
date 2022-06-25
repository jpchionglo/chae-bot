import { ModalSubmitInteraction } from "discord.js";
import { ModalCommand } from "../Command";
import { Photocards } from "../database/photocards";

export const editPhotoCard: ModalCommand = {
  name: "editPhotoCard",
  description: "Adds a photocard to the database",
  type: "CHAT_INPUT",
  run: async (interaction: ModalSubmitInteraction) => {
    // const title = interaction.;
    // const imageUrl = interaction.fields.getTextInputValue("imageUrlInput");
    // const rarity = interaction.fields.getTextInputValue("rarityInput");
    // const era = interaction.fields.getTextInputValue("eraInput");
    // const set = interaction.fields.getTextInputValue("setInput");

    // try {
    //   const photocard = await Photocards.update(
    //     {
    //       name: title,
    //       imageUrl,
    //       cost: 0,
    //       rarity,
    //       era,
    //       set,
    //     },
    //     { where: { name: title } }
    //   );

    //   return interaction.reply(`Card ${photocard.name} edited!`);
    // } catch (error: any) {
    //   return interaction.reply(
    //     "Something went wrong with editing a photocard."
    //   );
    // }
  },
};

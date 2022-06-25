import {
  BaseCommandInteraction,
  ButtonInteraction,
  CacheType,
  MessageInteraction,
  ModalSubmitInteraction,
} from "discord.js";
import { ButtonCommand, ModalCommand } from "../Command";
import { Photocards } from "../database/photocards";

export const deletePhotoCard: ButtonCommand = {
  name: "deletePhotoCard",
  description: "Adds a photocard to the database",
  type: "CHAT_INPUT",
  run: async (interaction: ButtonInteraction) => {
    const name = interaction.message.embeds[0].title;

    const rowCount = await Photocards.destroy({ where: { name: name } });

    if (!rowCount) {
      await interaction.update({
        content: "That photocard doesn't exist.",
        embeds: [],
        components: [],
      });
    } else {
      await interaction.update({
        content: `Photocard ${name} deleted.`,
        embeds: [],
        components: [],
      });
    }
  },
};

import {
  BaseCommandInteraction,
  Client,
  MessageActionRow,
  ModalActionRowComponent,
} from "discord.js";
import { Command } from "../Command";
import { Photocards } from "../database/photocards";

const { Modal, TextInputComponent } = require("discord.js");

export const editcard: Command = {
  name: "editcard",
  description: "Edits a photocard",
  type: "CHAT_INPUT",
  options: [
    {
      type: "STRING",
      name: "name",
      description: "Name of card to edit",
      required: true,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const photocard = await Photocards.findOne({
      where: { name: interaction.options.get("name")?.value },
    });

    if (photocard) {
      const modal = new Modal()
        .setCustomId("editPhotoCard")
        .setTitle(`${interaction.options.get("name")?.value}`);

      const imageUrl = new TextInputComponent()
        .setCustomId("imageUrlInput")
        .setLabel("Image URL")
        .setStyle("SHORT")
        .setValue(photocard.get("imageUrl"));

      const rarity = new TextInputComponent()
        .setCustomId("rarityInput")
        .setLabel("Rarity")
        .setStyle("SHORT")
        .setValue(String(photocard.get("rarity")));

      const era = new TextInputComponent()
        .setCustomId("eraInput")
        .setLabel("Era")
        .setStyle("SHORT")
        .setValue(photocard.get("era"));

      const set = new TextInputComponent()
        .setCustomId("setInput")
        .setLabel("Set #")
        .setStyle("SHORT")
        .setValue(String(photocard.get("set")));

      const cost = new TextInputComponent()
        .setCustomId("costInput")
        .setLabel("Cost")
        .setStyle("SHORT")
        .setValue(String(photocard.get("cost")));

      const firstActionRow =
        new MessageActionRow<ModalActionRowComponent>().addComponents(imageUrl);

      const secondActionRow =
        new MessageActionRow<ModalActionRowComponent>().addComponents(rarity);

      const thirdActionRow =
        new MessageActionRow<ModalActionRowComponent>().addComponents(era);

      const fourthActionRow =
        new MessageActionRow<ModalActionRowComponent>().addComponents(set);

      const fifthActionRow =
        new MessageActionRow<ModalActionRowComponent>().addComponents(cost);

      modal.addComponents(
        firstActionRow,
        secondActionRow,
        thirdActionRow,
        fourthActionRow,
        fifthActionRow
      );

      await interaction.showModal(modal);
    } else {
      await interaction.reply(
        `Photocard ${interaction.options.get("name")?.value} not found.`
      );
    }
  },
};

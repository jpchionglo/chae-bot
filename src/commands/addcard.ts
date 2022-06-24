import {
  BaseCommandInteraction,
  Client,
  MessageActionRow,
  ModalActionRowComponent,
} from "discord.js";
import { Command } from "../Command";

const { Modal, TextInputComponent } = require("discord.js");

export const addcard: Command = {
  name: "addcard",
  description: "Adds a photocard",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const modal = new Modal()
      .setCustomId("addCardToDatabase")
      .setTitle("Add a Photocard");

    const title = new TextInputComponent()
      .setCustomId("titleInput")
      .setLabel("Photocard Title")
      .setStyle("SHORT")
      .setRequired(true);

    const imageUrl = new TextInputComponent()
      .setCustomId("imageUrlInput")
      .setLabel("Image URL")
      .setStyle("SHORT")
      .setRequired(true);

    const rarity = new TextInputComponent()
      .setCustomId("rarityInput")
      .setLabel("Rarity")
      .setStyle("SHORT")
      .setRequired(true);

    const era = new TextInputComponent()
      .setCustomId("eraInput")
      .setLabel("Era")
      .setStyle("SHORT")
      .setRequired(true);

    const set = new TextInputComponent()
      .setCustomId("setInput")
      .setLabel("Set #")
      .setStyle("SHORT")
      .setRequired(true);

    const firstActionRow =
      new MessageActionRow<ModalActionRowComponent>().addComponents(title);

    const secondActionRow =
      new MessageActionRow<ModalActionRowComponent>().addComponents(imageUrl);

    const thirdActionRow =
      new MessageActionRow<ModalActionRowComponent>().addComponents(rarity);

    const fourthActionRow =
      new MessageActionRow<ModalActionRowComponent>().addComponents(era);

    const fifthActionRow =
      new MessageActionRow<ModalActionRowComponent>().addComponents(set);

    modal.addComponents(
      firstActionRow,
      secondActionRow,
      thirdActionRow,
      fourthActionRow,
      fifthActionRow
    );

    await interaction.showModal(modal);
  },
};

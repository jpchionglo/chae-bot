import {
  BaseCommandInteraction,
  Client,
  Interaction,
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
        .setPlaceholder("Leave empty for no change")
        .setValue(photocard.get("imageUrl"));

      const rarity = new TextInputComponent()
        .setCustomId("rarityInput")
        .setLabel("Rarity")
        .setStyle("SHORT")
        .setPlaceholder("Leave empty for no change")
        .setValue(String(photocard.get("rarity")));

      const era = new TextInputComponent()
        .setCustomId("eraInput")
        .setLabel("Era")
        .setStyle("SHORT")
        .setPlaceholder("Leave empty for no change")
        .setValue(photocard.get("era"));

      const set = new TextInputComponent()
        .setCustomId("setInput")
        .setLabel("Set #")
        .setStyle("SHORT")
        .setPlaceholder("Leave empty for no change")
        .setValue(String(photocard.get("set")));

      const cost = new TextInputComponent()
        .setCustomId("costInput")
        .setLabel("Cost")
        .setStyle("SHORT")
        .setPlaceholder("Leave empty for no change")
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

      client.once(
        "interactionCreate",
        async (modalInteraction: Interaction) => {
          if (
            modalInteraction.isModalSubmit() &&
            modalInteraction.customId === "editPhotoCard"
          ) {
            let modalImageUrl =
              modalInteraction.fields.getTextInputValue("imageUrlInput");
            let modalRarity =
              modalInteraction.fields.getTextInputValue("rarityInput");
            let modalEra =
              modalInteraction.fields.getTextInputValue("eraInput");
            let modalSet =
              modalInteraction.fields.getTextInputValue("setInput");
            let modalCost =
              modalInteraction.fields.getTextInputValue("costInput");

            modalImageUrl =
              modalImageUrl === "" ? photocard.get("imageUrl") : modalImageUrl;
            modalRarity =
              modalRarity === "" ? photocard.get("rarity") : modalRarity;
            modalEra = modalEra === "" ? photocard.get("era") : modalEra;
            modalSet = modalSet === "" ? photocard.get("set") : modalSet;
            modalCost = modalCost === "" ? photocard.get("cost") : modalCost;

            const affectedRows = await Photocards.update(
              {
                imageUrl: modalImageUrl,
                rarity: modalRarity,
                era: modalEra,
                set: modalSet,
                cost: modalCost,
              },
              { where: { name: photocard.get("name") } }
            );

            if (affectedRows > 0) {
              await modalInteraction.reply(
                `Photocard "${photocard.get("name")}" updated.`
              );
            } else {
              await modalInteraction.reply(
                `Could not find card name "${photocard.get("name")}".`
              );
            }
          }
        }
      );
    } else {
      await interaction.reply(
        `Photocard ${interaction.options.get("name")?.value} not found.`
      );
    }
  },
};

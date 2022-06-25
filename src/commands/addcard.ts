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

export const addcard: Command = {
  name: "addcard",
  description: "Adds a photocard",
  type: "CHAT_INPUT",
  options: [
    {
      type: "STRING",
      name: "name",
      description: "Name of card to create",
      required: true,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const name = interaction.options.get("name")?.value;

    const photocard = await Photocards.findOne({
      where: { name },
    });

    if (photocard) {
      interaction.reply("A photocard with that name already exists.");
    } else {
      const modal = new Modal()
        .setCustomId("addPhotoCard")
        .setTitle(`Add a Photocard (${name})`);

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

      const cost = new TextInputComponent()
        .setCustomId("costInput")
        .setLabel("Cost")
        .setStyle("SHORT")
        .setRequired(true);

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
            modalInteraction.customId === "addPhotoCard"
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
            try {
              const photocard = await Photocards.create(
                {
                  name,
                  imageUrl: modalImageUrl,
                  rarity: modalRarity,
                  era: modalEra,
                  set: modalSet,
                  cost: modalCost,
                },
                { where: { name } }
              );

              return modalInteraction.reply(`Card ${photocard.name} added!`);
            } catch (error: any) {
              console.log(error);
              if (error.name === "SequelizeUniqueConstraintError") {
                return modalInteraction.reply("That photocard already exists.");
              }

              return modalInteraction.reply(
                "Something went wrong with adding a photocard."
              );
            }
          }
        }
      );
    }
  },
};

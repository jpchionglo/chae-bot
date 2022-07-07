import { doesNotThrow } from "assert";
import {
  BaseCommandInteraction,
  ButtonInteraction,
  Client,
  EmbedFieldData,
  Interaction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from "discord.js";
import { Command } from "../Command";
import { Photocards } from "../database/photocards";
import interactionCreate from "../listeners/interactionCreate";
import { DatabaseModel, Photocard } from "../models/photoCardModel";

const { discord } = require("discord.js");

export const listall: Command = {
  name: "listall",
  description: "Lists all cards",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const photocards: string[] = (
      await Photocards.findAll({
        order: [["name", "DESC"]],
      })
    ).map(
      (object: DatabaseModel) =>
        `Rarity: ${object.dataValues.rarity} | Name: [${object.dataValues.name}](${object.dataValues.imageUrl})`
    );

    let currentPage: string[] = [];
    let currentPageIndex = 0;
    let maxItemsPerPage = 6;
    let maxPages = Math.ceil(photocards.length / maxItemsPerPage);

    let done = false;

    await interaction.reply("Loading...");

    let embedMessage;

    async function updatePage() {
      const previousButton = new MessageButton()
        .setCustomId("previous")
        .setLabel("Previous")
        .setStyle("DANGER");
      const nextButton = new MessageButton()
        .setCustomId("next")
        .setLabel("Next")
        .setStyle("PRIMARY");

      if (currentPageIndex === 0 || done) {
        previousButton.setDisabled(true);
      }
      if (currentPageIndex + 1 === maxPages || done) {
        nextButton.setDisabled(true);
      }

      const row = new MessageActionRow().addComponents(
        previousButton,
        nextButton
      );

      currentPage = [];

      let calculatedPageIndex =
        currentPageIndex * maxItemsPerPage - 1 < 0
          ? 0
          : currentPageIndex * maxItemsPerPage - 1;

      let maxIndex = Math.min(
        photocards.length,
        calculatedPageIndex + maxItemsPerPage
      );

      for (let i = calculatedPageIndex; i < maxIndex; i++) {
        currentPage.push(photocards[i]);
      }

      let description = currentPage.join("\r\n");

      const embed = new MessageEmbed()
        .setColor("#0E86D4")
        .setTitle("All Cards")
        .setDescription(description)
        .setFooter({ text: `Page ${currentPageIndex + 1}/${maxPages}` })
        .setTimestamp();

      embedMessage = await interaction.editReply({
        content: null,
        embeds: [embed],
        components: [row],
      });
    }

    await updatePage();

    let message = await interaction.fetchReply();

    let nextListener = async (buttonInteraction: Interaction) => {
      if (
        buttonInteraction.isButton() &&
        buttonInteraction.customId === "next" &&
        buttonInteraction.message.id === message.id
      ) {
        currentPageIndex++;
        await updatePage();
        await buttonInteraction.deferUpdate();
        resetTimer();
      }
    };

    let previousListener = async (buttonInteraction: Interaction) => {
      if (
        buttonInteraction.isButton() &&
        buttonInteraction.customId === "previous" &&
        buttonInteraction.message.id === message.id
      ) {
        currentPageIndex--;
        await updatePage();
        await buttonInteraction.deferUpdate();
        resetTimer();
      }
    };

    let timer = setTimeout(() => {
      done = true;
      updatePage();
      client.removeListener("interactionCreate", nextListener);
      client.removeListener("interactionCreate", previousListener);
    }, 10000);

    function resetTimer() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        done = true;
        updatePage();
        client.removeListener("interactionCreate", nextListener);
        client.removeListener("interactionCreate", previousListener);
      }, 10000);
    }

    client.on("interactionCreate", nextListener);
    client.on("interactionCreate", previousListener);
  },
};

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
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  TextChannel,
  User,
} from "discord.js";
import { Command } from "../Command";
import { Photocards, sequelize } from "../database/photocards";
import interactionCreate from "../listeners/interactionCreate";
import { DatabaseModel, Photocard } from "../models/photoCardModel";
import * as gacha from "../models/gacha";

const { discord } = require("discord.js");

export const drop: Command = {
  name: "drop",
  description: "Drops 3 cards from the market",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    let cardRarity1 = gacha.getCardRarity(Math.floor(Math.random() * 100));
    let cardRarity2 = gacha.getCardRarity(Math.floor(Math.random() * 100));
    let cardRarity3 = gacha.getCardRarity(Math.floor(Math.random() * 100));

    const photocard1 = await Photocards.findOne({
      where: { rarity: cardRarity1 },
      order: sequelize.random(),
    });

    const photocard2 = await Photocards.findOne({
      where: { rarity: cardRarity2 },
      order: sequelize.random(),
    });

    const photocard3 = await Photocards.findOne({
      where: { rarity: cardRarity3 },
      order: sequelize.random(),
    });

    console.log(
      photocard1.get("rarity"),
      photocard2.get("rarity"),
      photocard3.get("rarity")
    );

    const embed1 = new MessageEmbed()
      .setColor("#0E86D4")
      .setTitle(photocard1.get("name"))
      .setURL(photocard1.get("imageUrl"))
      .addFields(
        { name: "Era", value: photocard1.get("era"), inline: true },
        { name: "Set", value: String(photocard1.get("set")), inline: true },
        {
          name: "Rarity",
          value: String(photocard1.get("rarity")),
          inline: true,
        }
      )
      .setThumbnail(photocard1.get("imageUrl"));

    const embed2 = new MessageEmbed()
      .setColor("#0E86D4")
      .setTitle(photocard2.get("name"))
      .setURL(photocard2.get("imageUrl"))
      .addFields(
        { name: "Era", value: photocard2.get("era"), inline: true },
        { name: "Set", value: String(photocard2.get("set")), inline: true },
        {
          name: "Rarity",
          value: String(photocard2.get("rarity")),
          inline: true,
        }
      )
      .setThumbnail(photocard2.get("imageUrl"));

    const embed3 = new MessageEmbed()
      .setColor("#0E86D4")
      .setTitle(photocard3.get("name"))
      .setURL(photocard3.get("imageUrl"))
      .addFields(
        { name: "Era", value: photocard3.get("era"), inline: true },
        { name: "Set", value: String(photocard3.get("set")), inline: true },
        {
          name: "Rarity",
          value: String(photocard3.get("rarity")),
          inline: true,
        }
      )
      .setThumbnail(photocard3.get("imageUrl"));

    await interaction.deferReply();

    let card1 = await interaction.channel?.send({ embeds: [embed1] });
    let card2 = await interaction.channel?.send({ embeds: [embed2] });
    let card3 = await interaction.channel?.send({ embeds: [embed3] });

    await card1?.react("👍");
    await card2?.react("👍");
    await card3?.react("👍");

    let pickMessage = await interaction.channel?.send(
      `React with 👍 claim a card for 5 \`\`💎\`\``
    );

    async function clearCards() {
      await card1?.delete();
      await card2?.delete();
      await card3?.delete();
      await pickMessage?.delete();
    }

    let timer: NodeJS.Timeout;

    timer = setTimeout(async () => {
      await clearCards();
      await interaction.followUp("Drop timed out.");
    }, 10000);

    card1
      ?.awaitReactions({
        filter: (reaction, user) => {
          return (
            reaction.emoji.name === "👍" && user.id === interaction.user.id
          );
        },
        max: 1,
        time: 10000,
        errors: ["time"],
      })
      .then(async () => {
        await clearCards();
        clearTimeout(timer);
        interaction.followUp("Card1 selected");
      }).catch();

    // const card1Collector = card1?.createReactionCollector({
    //   filter: (reaction, user) => {
    //     return reaction.emoji.name === "👍" && user.id === interaction.user.id;
    //   },
    //   time: 10000,
    // });

    // const card2Collector = card2?.createReactionCollector({
    //   filter: (reaction, user) => {
    //     return reaction.emoji.name === "👍" && user.id === interaction.user.id;
    //   },
    //   time: 10000,
    // });

    // const card3Collector = card3?.createReactionCollector({
    //   filter: (reaction, user) => {
    //     return reaction.emoji.name === "👍" && user.id === interaction.user.id;
    //   },
    //   time: 10000,
    // });

    // card1Collector?.on("collect", async (reaction, user) => {
    //   await clearCards();
    //   clearTimeout(timer);
    //   interaction.followUp("Card1 selected");
    // });

    // card2Collector?.on("collect", async (reaction, user) => {
    //   await clearCards();
    //   clearTimeout(timer);
    //   interaction.followUp("Card2 selected");
    // });

    // card3Collector?.on("collect", async (reaction, user) => {
    //   await clearCards();
    //   clearTimeout(timer);
    //   interaction.followUp("Card3 selected");
    // });

    // let reactionListener = (
    //   reaction_orig: MessageReaction | PartialMessageReaction,
    //   user: User | PartialUser
    // ) => {
    //   console.log(reaction_orig.message.author?.id, user.id);
    //   if (reaction_orig.message.author?.id === user.id) {
    //     clearCards();
    //     clearTimeout(timer);
    //     pickMessage?.edit("You've chosen a card!");
    //     return;
    //   }
    // };

    // timer = setTimeout(() => {
    //   clearCards();
    //   client.removeListener("messageReactionAdd", reactionListener);
    //   pickMessage?.edit("Drop timed out.");
    // }, 10000);

    // client.on("messageReactionAdd", reactionListener);
  },
};

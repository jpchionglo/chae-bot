import {
  BaseCommandInteraction,
  ButtonInteraction,
  Client,
  Interaction,
  ModalSubmitInteraction,
} from "discord.js";
import { add } from "winston";
import { ButtonCommands, Commands, ModalCommands } from "../Commands";
import { Users } from "../database/users";
import { Role } from "../models/roles";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      await handleUser(client, interaction);
      await handleSlashCommand(client, interaction);
    } else if (interaction.isModalSubmit()) {
      await handleModalInput(interaction);
    } else if (interaction.isButton()) {
      await handleButtonInput(interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: BaseCommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find(
    (command) => command.name === interaction.commandName
  );

  if (!slashCommand) {
    interaction.reply({ content: "An error has occurred" });
    return;
  }

  slashCommand.run(client, interaction);
};

const handleModalInput = async (
  interaction: ModalSubmitInteraction
): Promise<void> => {
  if (interaction.customId !== "editPhotoCard") {
    const modalCommand = ModalCommands.find(
      (command) => command.name === interaction.customId
    );

    if (!modalCommand) {
      interaction.reply({ content: "An error has occurred" });
      return;
    }

    modalCommand.run(interaction);
  }
};

const handleButtonInput = async (
  interaction: ButtonInteraction
): Promise<void> => {
  const buttonCommand = ButtonCommands.find(
    (command) => command.name === interaction.customId
  );

  if (!buttonCommand) {
    interaction.reply({ content: "An error has occurred" });
    return;
  }

  buttonCommand.run(interaction);
};

const handleUser = async (
  client: Client,
  interaction: BaseCommandInteraction
): Promise<void> => {
  const user = await Users.findOne({
    where: { userId: interaction.user.id },
  });
  if (!user) {
    await addNewUser(interaction.user.username, interaction.user.id);
  }

  if (interaction.options.get("user")) {
    const additionalUser = await Users.findOne({
      where: { userId: String(interaction.options.get("user")?.value) },
    });

    if (!additionalUser) {
      let userId = String(interaction.options.get("user")?.value);
      let username = await (await client.users.fetch(userId)).username;
      await addNewUser(username, userId);
    }
  }
};

const addNewUser = async (username: string, userId: string): Promise<void> => {
  try {
    await Users.create({
      userId: userId,
      username,
      role: Role.USER,
    });
  } catch (error) {
    console.log("Error on user creation: ", error);
  }

  console.log(`Created user ${username}`);
};

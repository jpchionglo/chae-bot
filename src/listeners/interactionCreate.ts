import {
  BaseCommandInteraction,
  Client,
  Interaction,
  ModalSubmitInteraction,
} from "discord.js";
import { Commands, ModalCommands } from "../Commands";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      await handleSlashCommand(client, interaction);
    } else if (interaction.isModalSubmit()) {
      await handleModalInput(interaction);
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

//Currently Maps Modal input to database commands
const handleModalInput = async (
  interaction: ModalSubmitInteraction
): Promise<void> => {
  const modalCommand = ModalCommands.find(
    (command) => command.name === interaction.customId
  );

  if (!modalCommand) {
    interaction.reply({ content: "An error has occurred" });
    return;
  }

  modalCommand.run(interaction);
};

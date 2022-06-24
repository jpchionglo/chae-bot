import { Client } from "discord.js";
import { Commands } from "../Commands";
import { Photocards } from "../database/photocards";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    Photocards.sync();
    await client.application.commands.set(Commands);

    console.log(`${client.user.username} is online`);
  });
};

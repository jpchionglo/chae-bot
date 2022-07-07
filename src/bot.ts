import { Client, Intents } from "discord.js";
import { auth } from "../auth";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";

console.log("Bot is starting...");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

ready(client);
interactionCreate(client);

client.login(auth.token);

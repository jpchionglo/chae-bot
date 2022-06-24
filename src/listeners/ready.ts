import { Client } from "discord.js";
import { Commands } from "../Commands";
import { Work } from "../database/work";
import { Photocards } from "../database/photocards";
import { UserPhotocards } from "../database/userPhotocards";
import { Users } from "../database/users";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    initDatabase();

    await client.application.commands.set(Commands);

    console.log(`${client.user.username} is online`);
  });

  function initDatabase() {
    Photocards.sync();
    Users.sync();
    UserPhotocards.sync();
    Work.sync();

    UserPhotocards.belongsTo(Photocards, { foreignKey: "cardId" });
    UserPhotocards.belongsTo(Users, { foreignKey: "userId" });
    Work.belongsTo(Users, { foreignKey: "userId" });
  }
};

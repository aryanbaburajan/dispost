const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, token } = require("./config.json");

const commands = [
  new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite the bot to your server"),
  new SlashCommandBuilder()
    .setName("create")
    .setDescription("Create a new post")
    .addStringOption((option) =>
      option
        .setName("title")
        .setRequired(true)
        .setDescription("The title of the post")
    )
    .addAttachmentOption((option) =>
      option
        .setName("content")
        .setRequired(true)
        .setDescription("The content of the post (.gif)")
    ),
  new SlashCommandBuilder()
    .setName("watch")
    .setDescription("Start a watch session"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

// rest
//   .put(Routes.applicationCommands(clientId), { body: commands })
//   .then(() => console.log("Successfully registered application commands."))
//   .catch(console.error);

rest
  .put(Routes.applicationGuildCommands(clientId, "831047342215659521"), {
    body: commands,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);

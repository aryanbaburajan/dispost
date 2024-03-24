const {
  Client,
  Intents,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const { token, inviteLink, themeColor } = require("./config.json");
const { createPost, getRandomPost } = require("./database");

function connectBot() {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

  client.once("ready", () => {
    console.log("Ready!");
  });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
      await handleCommand(interaction);
    }

    if (interaction.isButton()) {
      await handleButton(interaction);
    }
  });

  client.login(token);
}

async function handleButton(interaction) {
  if (interaction.customId == "next") {
    let post = await getRandomPost();

    const embed = new MessageEmbed()
      .setTitle(post[0].title)
      .setDescription(post[0].username)
      .setImage(post[0].content)
      .setColor(themeColor)
      .setTimestamp();

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("next")
        .setLabel("Next")
        .setStyle("SECONDARY")
    );

    await interaction.update({ embeds: [embed], components: [row] });
  }
}

async function handleCommand(interaction) {
  if (interaction.commandName == "invite") {
    const embed = new MessageEmbed()
      .setTitle("DisPost")
      .setDescription("To invite me to your server, click the button below.")
      .setColor(themeColor)
      .setTimestamp();

    const row = new MessageActionRow().addComponents(
      new MessageButton().setURL(inviteLink).setLabel("Invite").setStyle("LINK")
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  } else if (interaction.commandName == "create") {
    const embed = new MessageEmbed()
      .setTitle(interaction.options.getString("title"))
      .setImage(interaction.options.getAttachment("content").url)
      .setColor(themeColor)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
    createPost(
      interaction.options.getString("title"),
      interaction.options.getAttachment("content").url,
      interaction.user.username
    );
  } else if (interaction.commandName == "watch") {
    let post = await getRandomPost();

    const embed = new MessageEmbed()
      .setTitle(post[0].title)
      .setDescription(post[0].username)
      .setImage(post[0].content)
      .setColor(themeColor)
      .setTimestamp();

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("next")
        .setLabel("Next")
        .setStyle("SECONDARY")
    );

    await interaction.user.send({ embeds: [embed], components: [row] });

    const toDM = new MessageEmbed()
      .setTitle("Off to DMs we go!")
      .setDescription(
        "Watching posts is limited to DMs to avoid spam in servers."
      )
      .setColor(themeColor)
      .setTimestamp();

    await interaction.reply({ embeds: [toDM], ephemeral: true });
  }
}

module.exports = { connectBot };

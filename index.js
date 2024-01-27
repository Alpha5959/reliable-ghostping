const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Events,
} = require("discord.js");

const GHOST_PING_EVENT = "GhostPing";

/**
 * A configurable and robust ghost ping detection and handling module.
 * @param {Client} client The Discord.js client.
 * @param {Object} options Configuration options for the module.
 * @returns {void}
 */
function reliableGhostping(client, options = {}) {
  const defaultOptions = {
    embedColor: "#ff0000",
    embedTitle: "Ghost Ping Detected!",
    embedDescription:
      "A user has deleted a message that mentioned another user.",
    pingerFieldTitle: "Pinger:",
    pingedFieldTitle: "Pinged:",
    messageContentFieldTitle: "Message Content:",
    footerText: "Reliable Ghost Ping Module",
    footerIconURL:
      "https://cdn.discordapp.com/avatars/1030870443005071512/7c563a5ae0b708f1600d002adeb26104.webp?size=1024&format=webp&width=0&height=320",
    logChannelID: null,
    deleteButtonID: "delete",
    deleteButtonLabel: "Delete",
  };

  const finalOptions = { ...defaultOptions, ...options };

  client.on(Events.MessageDelete, async (message) => {
    if (!message || !client || !message.author) return;

    if (
      !message.mentions.users.size ||
      message.guild === null ||
      message.author.id === message.mentions.users.first().id ||
      message.mentions.users.first().bot
    )
      return;

    const pinger = message.author;
    const pinged = message.mentions.users.first();
    const mcontent = message.content;

    const embed = new EmbedBuilder()
      .setColor(finalOptions.embedColor)
      .setTitle(finalOptions.embedTitle)
      .setDescription(finalOptions.embedDescription)
      .addFields(
        {
          name: finalOptions.pingerFieldTitle,
          value: pinger.tag,
          inline: true,
        },
        {
          name: finalOptions.pingedFieldTitle,
          value: pinged.tag,
          inline: true,
        },
        {
          name: finalOptions.messageContentFieldTitle,
          value: mcontent,
          inline: false,
        }
      )
      .setFooter({
        text: finalOptions.footerText,
        iconURL: finalOptions.footerIconURL,
      });

    const buttons = [
      new ButtonBuilder()
        .setCustomId(finalOptions.deleteButtonID)
        .setLabel(finalOptions.deleteButtonLabel)
        .setStyle(ButtonStyle.Danger),
    ];

    const row = new ActionRowBuilder().addComponents(buttons);

    let ghostPingMessage;

    if (finalOptions.logChannelID) {
      const logChannel = client.channels.cache.get(finalOptions.logChannelID);

      if (logChannel) {
        ghostPingMessage = await logChannel.send({
          embeds: [embed],
          components: [row],
        });
      }
    } else {
      ghostPingMessage = await pinger.send({
        embeds: [embed],
        components: [row],
      });
    }

    const filter = (interaction) => {
      return interaction.customId === finalOptions.deleteButtonID;
    };

    const collector = ghostPingMessage.createMessageComponentCollector({
      filter,
      time: 15 * 60 * 1000, // 15 minutes
    });

    collector.on("collect", async (interaction) => {
      if (interaction.user.id === pinger.id) {
        ghostPingMessage.delete();
      } else {
        console.log(
          "[RELIABLE] | [SYSTEM] | [BREAK] » There is a issue with interactions, thanks to report it to package developer."
        );
      }
    });

    collector.on("end", async (collected) => {
      if (collected.size === 0) {
        ghostPingMessage.delete();
      }
    });
  });
}

module.exports = {
  reliableGhostping,
};

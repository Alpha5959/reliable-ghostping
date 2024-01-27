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
    footerIconURL: client.user.displayAvatarURL(),
    logChannelID: null,
    deleteButtonID: "delete",
    deleteButtonLabel: "Delete",
    closeButtonID: "close",
    closeButtonLabel: "Close",
    customization: {},
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
      new ButtonBuilder()
        .setCustomId(finalOptions.closeButtonID)
        .setLabel(finalOptions.closeButtonLabel)
        .setStyle(ButtonStyle.Secondary),
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
      return (
        interaction.user.id === pinger.id || interaction.user.id === pinged.id
      );
    };

    const collector = ghostPingMessage.createMessageComponentCollector({
      filter,
      time: 15000,
    });

    collector.on("collect", async (interaction) => {
      await interaction.deferUpdate();

      if (interaction.customId === finalOptions.deleteButtonID) {
        ghostPingMessage.delete();
        interaction.followUp({
          content: "Ghost ping message deleted.",
          ephemeral: true,
        });
      } else if (interaction.customId === finalOptions.closeButtonID) {
        interaction.followUp({
          content: "Ghost ping message closed.",
          ephemeral: true,
        });
      }
    });

    collector.on("end", (collected) => {
      if (collected.size === 0) {
        ghostPingMessage.edit({ components: [] });
      }
    });
  });
}

module.exports = {
  reliableGhostping,
};

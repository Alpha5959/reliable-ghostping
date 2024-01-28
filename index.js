const { EmbedBuilder, Events } = require("discord.js");
const release_version = 'v1.7.3';

function createGhostPingEmbed(pinger, pinged, messageContent, embedColor, embedTitle, embedDescription) {
  return new EmbedBuilder()
    .setColor(embedColor)
    .setTitle(embedTitle)
    .setDescription(embedDescription)
    .addFields(
      {
        name: "Pinger:",
        value: pinger.tag,
        inline: true,
      },
      {
        name: "Pinged:",
        value: pinged.tag,
        inline: true,
      },
      {
        name: "Message Content:",
        value: messageContent,
        inline: false,
      }
    )
    .setFooter({
      text: "Reliable Ghost Ping Module",
      iconURL: "https://cdn.discordapp.com/avatars/1030870443005071512/7c563a5ae0b708f1600d002adeb26104.webp?size=1024&format=webp&width=0&height=320",
    });
}

function reliableGhostping(client, options = {}) {
  const defaultOptions = {
    embedColor: "#0099ff",
    embedTitle: "Ghost Ping Detected!",
    embedDescription: "A user has deleted a message that mentioned another user.",
    pingerFieldTitle: "Pinger:",
    pingedFieldTitle: "Pinged:",
    messageContentFieldTitle: "Message Content:",
    footerText: "Reliable Ghost Ping Module",
    footerIconURL: "https://cdn.discordapp.com/avatars/1030870443005071512/7c563a5ae0b708f1600d002adeb26104.webp?size=1024&format=webp&width=0&height=320",
    ignorelist: [],
    logChannelID: null,
  };

  const finalOptions = { ...defaultOptions, ...options };

  client.on(Events.MessageDelete, async (message) => {
    if (finalOptions.ignorelist.includes(message.author.id)) return;

    try {
      if (!message.author || !message.mentions.users.size || message.author.bot) return;

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
        const channel = message.channel;
        const timestamp = message.createdAt;
        const guild = message.guild;

      const embed = createGhostPingEmbed(pinger, pinged, mcontent, finalOptions.embedColor, finalOptions.embedTitle, finalOptions.embedDescription);

      const logChannel = client.channels.cache.get(finalOptions.logChannelID);
      const targetChannel = logChannel || pinger;

      await targetChannel.send({ embeds: [embed] });
      if (logChannel) {

        const timestampString = timestamp.toISOString().split('T')[0];
        const timestampTime = timestamp.toTimeString().split(' ')[0];
        
        const logEmbed = new EmbedBuilder()
          .setColor(finalOptions.embedColor)
          .setTitle(finalOptions.embedTitle)
          .setDescription(`${finalOptions.embedDescription}\nChannel: <#${channel.id}> (${channel.name})\nTimestamp: <t:${Math.floor(timestamp / 1000)}:R>\nMessage ID: ${message.id}\nGuild: ${guild.name}`)
          .addFields(
            {
              name: finalOptions.pingerFieldTitle,
              value: `<@${pinger.id}> (${pinger.id})`,
              inline: true,
            },
            {
              name: finalOptions.pingedFieldTitle,
              value: `<@${pinged.id}> (${pinged.id})`,
              inline: true,
            }
          )
          .setFooter({
            text: finalOptions.footerText,
            iconURL: finalOptions.footerIconURL,
          });
        
        await logChannel.send({ embeds: [logEmbed] });
      }

    } catch (error) {
      if (error.code === 50013 || error.code === 10008) {
        console.warn(`[WARNING] | ${release_version} | reliable_ghostping: Log channel not found or invalid.`);
      } else {
        console.error(`[ERROR] | ${release_version} | reliable_ghostping: `, error);
      }
    }
  });

  client.on(Events.MessageUpdate, async (oldMessage, newMessage) => {
    if (finalOptions.ignorelist.includes(newMessage.author.id)) return;

    try {
      if (!newMessage.author || !newMessage.mentions.users.size || newMessage.author.bot) return;

      if (
        !newMessage.mentions.users.size ||
        newMessage.guild === null ||
        newMessage.author.id === newMessage.mentions.users.first().id ||
        newMessage.mentions.users.first().bot
      )
        return;

      const pinger = newMessage.author;
      const pinged = newMessage.mentions.users.first();
      const mcontent = newMessage.content;

      const oldEmbed = oldMessage.embeds[0];
      const newEmbed = newMessage.embeds[0];        

      if (oldEmbed && !newEmbed && oldEmbed.fields.find(field => field.name === finalOptions.pingerFieldTitle)) {
        const embed = createGhostPingEmbed(pinger, pinged, mcontent, finalOptions.embedColor, finalOptions.embedTitle, finalOptions.embedDescription);

        const logChannel = client.channels.cache.get(finalOptions.logChannelID);
        const targetChannel = logChannel || pinger;

        await targetChannel.send({ embeds: [embed] });
      }

    } catch (error) {
      if (error.code === 50013 || error.code === 10008) {
        console.warn(`[WARNING] | ${release_version} | reliable_ghostping: Log channel not found or invalid.`);
      } else {
        console.error(`[ERROR] | ${release_version} | reliable_ghostping: `, error);
      }
    }
  });
}

module.exports = {
  reliableGhostping,
};

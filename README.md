## Ghost Ping Module 👻: The Ultimate Ghost Ping Prevention Tool

<p align="center">
  <a href="https://www.npmjs.com/package/reliable-ghostping">
    <img src="https://img.shields.io/npm/dt/reliable-ghostping?style=for-the-badge" alt="npm" />
  </a>

  <a href="https://discord.com/invite/Rw5gRVqSaK">
    <img src="https://img.shields.io/discord/1029777893112418314?color=5865F2&label=Reliable&style=for-the-badge" alt="Discord Server" />
  </a>
</p>

---

This module is designed to combat ghost pings within your Discord server. Ghost pings occur when a user deletes a message that mentioned another user, leaving the pinged user unaware that they were ever mentioned. Our module steps in to resolve this issue by logging deleted messages that contain mentions, ensuring that the pinged user is still notified. It also provides detailed information about the ghost ping, making it easier for moderators to take appropriate action.

---

### Features:
- 👤 Detects and logs deleted messages containing mentions.
- 🔔 Notifies the pinged user, even if the message was deleted.
- 🛡️ Provides detailed information about the ghost ping.
- 🚫 Ignores messages from specified users.
- 📝 Customizable embed messages and field titles.

---

### Setup:
1️⃣ **Invite the Bot**: Invite the bot to your Discord server.
2️⃣ **Grant Permissions**: Ensure the bot has the necessary permissions, such as `Send Messages` and `Read Message History`.
3️⃣ **Configure Options**: Customize the settings using the provided options (explained below).
4️⃣ **Enable the Module**: Call the `reliableGhostping` function with the desired options.

---

### Options:
- `embedColor`: Customize the embed color. (Default: `#0099ff`)
- `embedTitle`: Set the embed title. (Default: `Ghost Ping Detected!`)
- `embedDescription`: Specify the embed description. (Default: `A user has deleted a message that mentioned another user.`)
- `pingerFieldTitle`: Set the field title for the pinger. (Default: `Pinger:`)
- `pingedFieldTitle`: Set the field title for the pinged user. (Default: `Pinged:`)
- `messageContentFieldTitle`: Set the field title for the message content. (Default: `Message Content:`)
- `footerText`: Customize the footer text. (Default: `Reliable Ghost Ping Module`)
- `footerIconURL`: Set the footer icon URL. (Default: URL to the module's icon)
- `ignorelist`: Provide an array of user IDs to ignore.
- `logChannelID`: Specify the channel ID for logging ghost pings. (Default: `null`)

---

### Example Usage:
```js
const { reliableGhostping } = require("reliable-ghost-ping");

client.on("ready", () => {
  reliableGhostping(client, {
    logChannelID: "CHANNEL_ID",
    embedTitle: "Ghost Ping Alert!",
    ignorelist: ["USER_ID_1", "USER_ID_2"],
  });
});
```

---

### Additional Notes:
- The module listens to both `MessageDelete` and `MessageUpdate` events to ensure that deleted and edited messages are handled accordingly.
- The module handles multiple mentions in the same message.
- The module gracefully handles errors such as invalid channel IDs or missing permissions.

---

**Node.js and Discord.js Compatibility:**

The Reliable Ghost Ping Module is compatible with the latest stable versions of Node.js and Discord.js. As of the time of writing, these versions are, Just little you know, it's daily updated so, if it doesn't work with your node.js or discord.js version. No worries! We can still help you with our support:

- Node.js: v20.11.0
- Discord.js: v14.14.1

---

**Join our Discord Server for Support and Updates:**

Need help with setting up or using the Reliable Ghost Ping Module? Join our dedicated Discord server: https://dsc.gg/reliable-support. Our friendly community and support team are always ready to assist you. 🌟

---

**Reliable AI for Your Discord Needs:**

Looking for an advanced AI to enhance your Discord experience? Discover Reliable AI, a powerful Discord bot that offers a wide range of features, including moderation, auto-moderation and more. Invite Reliable AI to your server today: https://dsc.gg/reliable-bot

---

Enjoy using the Reliable Ghost Ping Module! 👻

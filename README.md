# Reliable Ghost Ping Module 👻

---

This module is designed to combat ghost pings within your Discord server. Ghost pings occur when a user deletes a message that mentioned another user, leaving the pinged user unaware that they were ever mentioned. Our module steps in to resolve this issue by logging deleted messages that contain mentions, ensuring that the pinged user is still notified. It also provides detailed information about the ghost ping, making it easier for moderators to take appropriate action.

---

### Features:
- 👤 Detects and logs deleted messages containing mentions.
- 🔔 Notifies the pinged user, even if the message was deleted.
- 🛡️ Provides detailed information about the ghost ping.
- 🚫 Ignores messages from specified users or channels.
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

### Support:
If you encounter any issues or have questions, feel free to open an issue on the module's GitHub repository.

---

Enjoy using the Reliable Ghost Ping Module! 👻

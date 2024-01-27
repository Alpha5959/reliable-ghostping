## Reliable Ghost Ping Module 👻: The Ultimate Ghost Ping Prevention Tool

<p align="center">
  <a href="https://www.npmjs.com/package/reliable-ghostping">
    <img src="https://img.shields.io/npm/dt/reliable-ghostping?style=for-the-badge" alt="npm" />
  </a>

  <a href="https://discord.com/invite/Rw5gRVqSaK">
    <img src="https://img.shields.io/discord/800631529351938089?color=5865F2&label=Reliable&style=for-the-badge" alt="Discord Server" />
  </a>
</p>

Hey there, Discord enthusiasts! 👋

Are you tired of dealing with pesky ghost pings on your server? 👻 Look no further than the Reliable Ghost Ping Module! This powerful tool is designed to help you effectively detect and handle ghost ping incidents, ensuring a smooth and enjoyable Discord experience for everyone. 🌟

**What is a Ghost Ping?**

A ghost ping occurs when a user deletes a message that mentions another user, leaving the pinged user with a notification but no visible message. This can be annoying and disruptive, especially if it happens frequently.

**How does the Reliable Ghost Ping Module Work?**

The Reliable Ghost Ping Module works by monitoring message deletions in real-time. When a message is deleted within 15 seconds of being sent and contains a mention of another user, the module generates an embed message containing information about the pinger, the pinged user, and the deleted message's content.

This embed message is then sent to a specified log channel or to the pinger's DM if no log channel is provided. The message includes two buttons: one to delete the ghost ping message and one to close it. Only the pinger and the pinged user can interact with these buttons.

**Benefits of Using the Reliable Ghost Ping Module:**

- **Effective Ghost Ping Detection:** The module quickly detects ghost pings within 15 seconds of message deletion, ensuring prompt action.
- **Detailed Embed Messages:** The generated embed messages provide comprehensive information about the ghost ping incident, including the pinger, pinged user, and deleted message content.
- **Actionable Buttons:** The embed messages include buttons that allow the pinger and pinged user to delete or close the ghost ping message, promoting effective resolution.
- **Customizable Settings:** The module offers various customization options, allowing you to tailor it to your server's specific needs and preferences.

**How to Use the Reliable Ghost Ping Module:**

1. **Installation:** Install the module using npm:

```
npm install reliable-ghostping
```

2. **Import the Module:** Import the module into your Discord.js project:

```javascript
const { reliableGhostping } = require("reliable-ghostping");
```

3. **Initialize the Module:** Initialize the module by passing your Discord.js client and configuration options:

```javascript
const client = new Discord.Client();

reliableGhostping(client, {
  embedColor: "#ff0000", //Customize Options #1
  embedTitle: "Ghost Ping Detected!", //Customize Options #2
});
```

Default:

```javascript
reliableGhostping(client, options);
```

**Configuration Options:**

- **embedColor:** Color of the ghost ping embed message. (Default: `"#ff0000"`)
- **embedTitle:** Title of the ghost ping embed message. (Default: `"Ghost Ping Detected!"`)
- **embedDescription:** Description of the ghost ping embed message. (Default: `"A user has deleted a message that mentioned another user."`)
- **pingerFieldTitle:** Title of the field displaying the pinger's information. (Default: `"Pinger:"`)
- **pingedFieldTitle:** Title of the field displaying the pinged user's information. (Default: `"Pinged:"`)
- **messageContentFieldTitle:** Title of the field displaying the deleted message's content. (Default: `"Message Content:"`)
- **footerText:** Text displayed in the embed's footer. (Default: `"Reliable Ghost Ping Module"`)
- **footerIconURL:** URL of the icon displayed in the embed's footer. (Default: `client.user.displayAvatarURL()`)
- **logChannelID:** ID of the text channel where ghost ping messages should be logged. (Default: `null`)
- **deleteButtonID:** Custom ID of the button used to delete the ghost ping message. (Default: `"delete"`)
- **deleteButtonLabel:** Label of the button used to delete the ghost ping message. (Default: `"Delete"`)
- **closeButtonID:** Custom ID of the button used to close the ghost ping message. (Default: `"close"`)
- **closeButtonLabel:** Label of the button used to close the ghost ping message. (Default: `"Close"`)
- **customization:** An object containing custom CSS styles to apply to the module's components.

**Node.js and Discord.js Compatibility:**

The Reliable Ghost Ping Module is compatible with the latest stable versions of Node.js and Discord.js. As of the time of writing, these versions are, Just little you know, it's daily updated so, if it doesn't work with your node.js or discord.js version. No worries! We can still help you with our support:

- Node.js: v18.6.0
- Discord.js: v14.14.1

**Join our Discord Server for Support and Updates:**

Need help with setting up or using the Reliable Ghost Ping Module? Join our dedicated Discord server: https://dsc.gg/reliable-support. Our friendly community and support team are always ready to assist you. 🌟

**Reliable AI for Your Discord Needs:**

Looking for an advanced AI to enhance your Discord experience? Discover Reliable AI, a powerful Discord bot that offers a wide range of features, including moderation, auto-moderation and more. Invite Reliable AI to your server today: https://dsc.gg/reliable-bot

**Together, let's make ghost pings a thing of the past and create a harmonious and enjoyable Discord community! 🤝**

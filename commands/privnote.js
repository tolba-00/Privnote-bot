const Discord = require("discord.js");
const { createPrivnote } = require("privnote");

module.exports = {
  name: "privnote",
  description: "Generates a Privnote using the Privnote API!",
  aliases: ["priv"],
  guildOnly: false,
  args: true,
  usage: "<text>",
  execute: async (message, args, client) => {
    message.delete();
    const created = await createPrivnote(args[0]);
    console.log(created);

    // message sent to author!!
    const privatedm = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("🔒 Your Privnote is ready!")
      .setDescription(
        "Privnote creation was a success! Please use the data provided below!"
      )
      .setThumbnail("https://i.imgur.com/Renllax.png")
      .addFields(
        { name: "🔗 Link:", value: created.url },
        { name: "🗝️ Passcode:", value: created.passphrase, inline: true },
        {
          name: "☕ Buy us a coffee!",
          value: "https://www.buymeacoffee.com/privnote",
          inline: true,
        }
      )
      .setFooter(
        "Thank you for using Privnote Bot!",
        "https://i.imgur.com/Renllax.png"
      );

    // message sent to guild channel!!
    const guildmessage = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("🔒 Your Privnote has been sent to your DMs!")
      .setDescription(
        `Please check your Direct Messages to recieve your privnote!`
      )
      .setThumbnail("https://i.imgur.com/Renllax.png")
      .setFooter(
        "Thank you for using Privnote Bot!",
        "https://i.imgur.com/Renllax.png"
      );

    message.channel.send(`<@${message.author.id}>`);
    message.channel.send(guildmessage);
    message.author.send(privatedm);
  },
};

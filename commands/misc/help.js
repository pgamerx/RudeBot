/**
 * @file Dynamic help command
 * @author PGamerX
 * @since 1.0.0
 */

// Deconstructing prefix from config file to use in help command
const { prefix } = require("./../../config.json");

// Deconstructing MessageEmbed to create embeds within this command
const { MessageEmbed } = require("discord.js");
const database = require("quick.db");
module.exports = {
  name: "help",
  description: "List all commands of bot or info about a specific command.",
  aliases: ["commands"],
  usage: "[command name]",
  cooldown: 5,

  /**
   * @description Executes when the command is called by command handler.
   * @author PGamerX
   * @param {Object} message The Message Object of the command.
   * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
   */

  execute(message, args) {
    // If there are no args, it means it needs whole help command.

    /**
     * @type {Object}
     * @description Help command embed object
     */

    const helpEmbed = new MessageEmbed()
      .setColor("RED")
      .setTitle("RudeBot: The Rudest Discord Bot you can get")
      .setDescription(
        "The bot is currently in development, so some commands may not work as intended."
      )
      .addFields(
        {
          name: "Modules",
          value: `List of available modules`,
        },
        {
          name: `${
            database.get(message.guild.id + "/channel/get_roasted")
              ? "<:ubmute:837570791700299807>"
              : "<:mute:837570872483119144>"
          } Get roasted by 'RudeBot'`,
          // One module is get_roasted that is a module that can be anebled or disabled.
          value: `This Module can be enabled using /enable command and disabled using /disable command. It is disabled by default and can be enabled in a specific channel where **RudeBot will roast everyone who sends a message.**`,
          inline: true,
        },
        {
          name: `${
            database.get(message.guild.id + "/channel/do_roast")
              ? "<:ubmute:837570791700299807>"
              : "<:mute:837570872483119144>"
          } Try to roast 'RudeBot'`,
          value:
            "This module can be enabled using /enable command and disabled using /disable command. It is disabled by default and can be enabled in a specific channel where anyone can **try to roast RudeBot and RudeBot will provide a comeback.**",
          inline: true,
        }
      )
      .setThumbnail(
        "https://images-ext-2.discordapp.net/external/fRUXQNa6LJodOuQmG8RiU1XblOW9IS3qExbQ-GZee_U/%3Fsize%3D256/https/cdn.discordapp.com/avatars/727496664935301140/26985ba2276b29beeb48198f80855b6c.png"
      )
      .setFooter({
        text: "Developed by PGamerX",
      });
    /*let helpEmbed = new MessageEmbed()
        .setColor(0x4286f4)
        .setURL(process.env.URL)
        .setTitle("List of all my commands")
        .setDescription(
          "`" + commands.map((command) => command.name).join("`, `") + "`"
        )

        .addField(
          "Usage",
          `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
        );

      // Attempts to send embed in DMs.

      return message.author
        .send({ embeds: [helpEmbed] })

        .then(() => {
          if (message.channel.type === "dm") return;

          // On validation, reply back.

          message.reply({
            content: "I've sent you a DM with all my commands!",
          });
        })
        .catch((error) => {
          // On failing, throw error.

          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          );

          message.reply({ content: "It seems like I can't DM you!" });
        });
		*/
    message.reply({ embeds: [helpEmbed] });
  },
};

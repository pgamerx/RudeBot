/**
 * @file Sample help command with slash command.
 * @author PGamerX
 * @author Naman Sharma <admin@pgamerx.com>
 * @since 1.0.0.
 * @version 3.1.0
 */

// Deconstructed the constants we need in this file.

const { MessageEmbed, Collection } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const database = require("quick.db");
module.exports = {
  // The data needed to register slash commands to Discord.
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription(
      "List all commands of bot or info about a specific command."
    ),
  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author PGamerX
   * @author Naman Sharma <admin@pgamerx.com>
   * @param {*} interaction The interaction object of the command.
   */

  async execute(interaction) {
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
            database.get(interaction.guild.id + "/channel/get_roasted")
              ? "<:ubmute:837570791700299807>"
              : "<:mute:837570872483119144>"
          } Get roasted by 'RudeBot'`,
          // One module is get_roasted that is a module that can be anebled or disabled.
          value: `This Module can be enabled using /enable command and disabled using /disable command. It is disabled by default and can be enabled in a specific channel where **RudeBot will roast everyone who sends a message.**`,
          inline: true,
        },
        {
          name: `${
            database.get(interaction.guild.id + "/channel/do_roast")
              ? "<:ubmute:837570791700299807>"
              : "<:mute:837570872483119144>"
          } Try to roast 'RudeBot'`,
          value:
            "This module can be enabled using /enable command and disabled using /disable command. It is disabled by default and can be enabled in a specific channel where **anyone can try to roast RudeBot and RudeBot will provide a comeback.**",
          inline: true,
        },
        {
          name: `${
            database.get(interaction.guild.id + "/channel/yo_mama")
              ? "<:ubmute:837570791700299807>"
              : "<:mute:837570872483119144>"
          } The 'Yo Mama' Module`,
          value:
            "This module can be enabled using /enable command and disabled using /disable command. It is disabled by default and can be enabled in a specific channel where **anyone who sends a message starting with 'Yo Mama' will be returned with a random YoMama Joke.**",
          inline: true,
        },
        {
          name: `Slash Commands`,
          value: `List of available slash commands`,
        },
        {
          name: `/enable`,
          value: `Enable a specific module.`,
          inline: true,
        },
        {
          name: `/disable`,
          value: `Disable a specific module.`,
          inline: true,
        },
        {
          name: `/help`,
          value: `List all commands of bot or info about a specific command.`,
          inline: true,
        },
        {
          name: `/ping`,
          value: `Check the ping of the bot.`,
          inline: true,
        },
        {
          name: `/roast`,
          value: `Roasts the user.`,
          inline: true,
        },
        {
          name: `/links`,
          value: `List of links of the bot.`,
          inline: true,
        }
      )
      .setThumbnail(
        "https://images-ext-2.discordapp.net/external/fRUXQNa6LJodOuQmG8RiU1XblOW9IS3qExbQ-GZee_U/%3Fsize%3D256/https/cdn.discordapp.com/avatars/727496664935301140/26985ba2276b29beeb48198f80855b6c.png"
      )
      .setFooter({
        text: "Developed by PGamerX",
      });
    await interaction.reply({
      embeds: [helpEmbed],
    });
  },
};

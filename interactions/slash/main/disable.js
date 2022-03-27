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
    .setName("disable")
    .setDescription("Disable a specific module.")
    .addStringOption((option) =>
      option
        .setName("module")
        .setDescription("The module you want to disable.")
        .setRequired(true)
        .addChoice("Get Roasted by 'RudeBot'", "get_roasted")
        .addChoice("Try to Roast 'RudeBot'", "do_roast")
        .addChoice("The 'Yo Mama' Module", "yo_mama")
    ),
  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author PGamerX
   * @author Naman Sharma <admin@pgamerx.com>
   * @param {*} interaction The interaction object of the command.
   */

  async execute(interaction) {
    // Check if the member is ADMIN
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      return interaction.reply({
        content: "You need to be an admin to use this command.",
      });
    }
    const choice = interaction.options.getString("module");
    if (choice === "get_roasted") {
      database.delete(`${interaction.guild.id}/channel/get_roasted`);
      return await interaction.reply({
        content: `The module ${choice} has been disabled!`,
      });
    } else if (choice === "do_roast") {
      database.delete(`${interaction.guild.id}/channel/do_roast`);
      return await interaction.reply({
        content: `The module ${choice} has been disabled!`,
      });
    } else if (choice === "yo_mama") {
      database.delete(`${interaction.guild.id}/channel/yo_mama`);
      return await interaction.reply({
        content: `The module ${choice} has been disabled!`,
      });
    }
  },
};

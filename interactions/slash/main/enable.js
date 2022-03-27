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
const { ChannelType } = require("discord-api-types/v9");

module.exports = {
  // The data needed to register slash commands to Discord.
  data: new SlashCommandBuilder()
    .setName("enable")
    .setDescription("Enable a specific module.")
    .addStringOption((option) =>
      option
        .setName("module")
        .setDescription("The module you want to enable.")
        .setRequired(true)
        .addChoice("Get Roasted by 'RudeBot'", "get_roasted")
        .addChoice("Try to Roast 'RudeBot'", "do_roast")
        .addChoice("The 'Yo Mama' Module", "yo_mama")
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The Channel you want to enable the module in.")
        .setRequired(true)
        .addChannelType(0)
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
    const channel = interaction.options.getChannel("channel");


    if (choice === "get_roasted") {
      database.set(`${interaction.guild.id}/channel/get_roasted`, channel.id);
      return await interaction.reply({
        content:
          `The channel for module ${choice} has been set to ` +
          `<#${channel.id}>`,
      });
    } else if (choice === "do_roast") {
      database.set(`${interaction.guild.id}/channel/do_roast`, channel.id);
      return await interaction.reply({
        content:
          `The channel for module ${choice} has been set to ` +
          `<#${channel.id}>`,
      });
    } else if (choice === "yo_mama") {
      database.set(`${interaction.guild.id}/channel/yo_mama`, channel.id);
      return await interaction.reply({
        content:
          `The channel for module ${choice} has been set to ` +
          `<#${channel.id}>`,
      });
    }
  },
};

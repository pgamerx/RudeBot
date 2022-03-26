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
    .setName("ping")
    .setDescription(
      "Provides information about latency and uptime of the bot."
    ),
  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author PGamerX
   * @author Naman Sharma <admin@pgamerx.com>
   * @param {*} interaction The interaction object of the command.
   */

  async execute(interaction){
   // Get latency and uptime of the bot
    const ping = interaction.client.ws.ping;
    const uptime = interaction.client.uptime;
    // Create a new embed
    const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Pong!")
        .setDescription(`Latency: ${ping}ms\nUptime: ${uptime}ms`);

    // Send the embed
   await interaction.reply({
        embeds: [embed]
    });

  }
};

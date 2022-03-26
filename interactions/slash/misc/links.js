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

const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  // The data needed to register slash commands to Discord.
  data: new SlashCommandBuilder()
    .setName("links")
    .setDescription(
      "Provides the links for the bot, such as invite, support server, and more."
    )
    .addStringOption((option) =>
      option
        .setName("channel")
        .setDescription("The link you want to get.")
        .setRequired(true)
        .addChoice("Invite the bot to your server.", "invite")
        .addChoice("My Support server.", "support")
        .addChoice("My GitHub Repository", "github")
        .addChoice("Donate to keep me alive.", "website")
    ),
  /**
   * @description Executes when the interaction is called by interaction handler.
   * @author PGamerX
   * @author Naman Sharma <admin@pgamerx.com>
   * @param {*} interaction The interaction object of the command.
   */

  async execute(interaction) {
    const channel = interaction.options.getString("channel");
    if (channel === "donate") {
      /// Create a new button
      const row = new MessageActionRow().addComponents(
        new MessageButton()
           
          .setLabel("Donation Methods")
          .setURL("https://pgamerx.com/donate")
          .setStyle("LINK")
      );

      await interaction.reply({
        content: "Click the button below to donate to keep me alive.",
        components: [row],
      });
    }
    if (channel === "support") {
      /// Create a new button
      const row = new MessageActionRow().addComponents(
        new MessageButton()
           
          .setLabel("Discord Server")
          .setURL("https://discord.com/invite/4TeGKpSkdN")
          .setStyle("LINK")
      );

      await interaction.reply({
        content: "Click the button below to join my support server",
        components: [row],
      });
    }
    if (channel === "invite") {
      /// Create a new button
      const row = new MessageActionRow().addComponents(
        new MessageButton()
           
          .setLabel("Invite 'RudeBot'")
          .setURL(
            "https://discord.com/oauth2/authorize?client_id=727496664935301140&scope=+applications.commands+bot&permissions=274878286912"
          )
          .setStyle("LINK")
      );

      await interaction.reply({
        content: "Click the button below to invite me to your server.",
        components: [row],
      });
    }
    if (channel === "github") {
      /// Create a new button
      const row = new MessageActionRow().addComponents(
        new MessageButton()
           
          .setLabel("GitHub Repository")
          .setURL("https://github.com/pgamerx/rudebot")
          .setStyle("LINK")
      );

      await interaction.reply({
        content: "Click the button below to view my GitHub Repository.",
        components: [row],
      });
    }
  },
};

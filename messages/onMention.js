/**
 * @file Default Bot Mention Command
 * @author PGamerX
 * @since 1.0.0.
 */

const { prefix } = require("../config.json");
const json = require("../responses/mention.json");
module.exports = {
  /**
   * @description Executes when the bot is pinged.
   * @author PGamerX
   * @param {Object} message The Message Object of the command.
   */

  async execute(message) {
    // Get a random response from the json file.
    const response = json[Math.floor(Math.random() * json.length)];
    message.reply(response["response"]);
    // Check if the response has an intent.
    if (response.intent) {
      // If it does, execute the intent.
      if (response.intent === "leave") {
        // Generate a random number between 1 and 6
        const random = Math.floor(Math.random() * 6) + 1;
        // If the random number is 1, leave the guild.
        if (random === 1) {
          return message.guild.leave();
        } else {
          return;
        }
      }
    }
  },
};

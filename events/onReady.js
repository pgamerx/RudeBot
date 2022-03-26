/**
 * @file Ready Event File.
 * @author PGamerX
 * @since 1.0.0
 */

module.exports = {
  name: "ready",
  once: true,

  /**
   * @description Executes the block of code when client is ready (bot initialization)
   * @param {Object} client Main Application Client
   */
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    // Set status
    client.user.setActivity(`with your mom | /help`, {
      type: "PLAYING",
    });
  },
};

/**
 * @file Sample ping command
 * @author PGamerX
 * @since 1.0.0
 */

module.exports = {
  name: "ping",

  /** You need to uncomment below properties if you need them. */
  //description: 'Ping!',
  //usage: 'put usage here',
  //permissions: 'SEND_MESSAGES',
  //guildOnly: true,

  /**
   * @description Executes when the command is called by command handler.
   * @author PGamerX
   * @param {Object} message The Message Object of the command.
   * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
   */

  execute(message, args) {
    message.reply({ content: "Pong." });
  },
};

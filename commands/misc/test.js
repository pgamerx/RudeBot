var Sentiment = require("sentiment");
var sentiment = new Sentiment();

/**
 * @file Sample ping command
 * @author PGamerX
 * @since 1.0.0
 */

module.exports = {
  name: "test",

  /** You need to uncomment below properties if you need them. */
  //description: 'Ping!',
  //usage: 'put usage here',
  //permissions: 'SEND_MESSAGES',
  //guildOnly: true,

  /**
   * @description Executes when the command is called by command handler.
   * @author PGamerX
   * @param {Object} message The Message Object of the command.
   */

  execute(message, args) {
    const result = sentiment.analyze(message.content);
    console.log(result);
  },
};

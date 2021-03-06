/**
 * @file Message Based Commands Handler
 * @author PGamerX
 * @since 1.0.0
 */

// Declares constants (destructured) to be used in this file.

const { Collection } = require("discord.js");
const { prefix, owner } = require("../config.json");
const database = require("quick.db");
const fetch = require("node-fetch");

const json = require("../responses/roasts.json");
const yomother = require("../responses/yomama.json");

const { NlpManager } = require("node-nlp");
const manager = new NlpManager({ languages: ["en"] });
manager.load();

var Sentiment = require("sentiment");
var sentiment = new Sentiment();

// Prefix regex, we will use to match in mention prefix.

const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

module.exports = {
  name: "messageCreate",

  /**
   * @description Executes when a message is created and handle it.
   * @author PGamerX
   * @param {Object} message The message which was created.
   */

  async execute(message) {
    // Declares const to be used.

    const { client, guild, channel, content, author } = message;

    // Checks if the bot is mentioned in the message all alone and triggers onMention trigger.
    // You can change the behavior as per your liking at ./messages/onMention.js

    if (
      (message.content == `<@${client.user.id}>` ||
        message.content == `<@!${client.user.id}>`) &&
      !message.mentions.everyone
    ) {
      require("../messages/onMention").execute(message);
      return;
    }

    if (message.author.bot) return;

    if (message.channel.id == database.get(`${guild.id}/channel/get_roasted`)) {
      const res = await fetch(
        "https://evilinsult.com/generate_insult.php?lang=en&type=json"
      );
      const json = await res.json();

      message.reply(json.insult);
    }

    if (message.channel.id == database.get(`${guild.id}/channel/do_roast`)) {
      const the_poor_roast = message.content;
      const result = sentiment.analyze(the_poor_roast);

      const response = await manager.process("en", the_poor_roast);
      const res = response.answer;

      if (res == "" || res == undefined || res == null || res.length == 0) {
        if (result["score"] >= 0 && result["score"] > -1) {
          // Say that it wasn't even an insult
          message.reply("You are not even insulting me at this point.");
        } else {
          // Return a comeback
          const response = json[Math.floor(Math.random() * json.length)];
          return message.reply(response);
        }
      }

      return message.reply(res);
    }

    if (message.channel.id == database.get(`${guild.id}/channel/yo_mama`)) {
      const content = message.content;
      // Check if the message contains 'yo mama' of any kind.
      const yo_mama = [
        "yo mama",
        "yo mamma",
        "yo mam",
        "yo mamma",
        "yo mam",
        "yo mamma",
        "yo mommy",
        "yo ma",
        "yo mother",
      ];
      if (!yo_mama.includes(content.toLowerCase()))
        return message.reply(
          `Yo mama is not here! ( ???_??? ), ||dumbass, start your setence with either of the following phrases: ${yo_mama.join(
            ", "
          )} ||`
        );

      const response = yomother[Math.floor(Math.random() * json.length)];
      return message.reply(response);
    }
    /**
     * @description Converts prefix to lowercase.
     * @type {String}
     */

    const checkPrefix = prefix.toLowerCase();

    /**
     * @description Regex expression for mention prefix
     */

    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})\\s*`
    );

    // Checks if message content in lower case starts with bot's mention.

    if (!prefixRegex.test(content.toLowerCase())) return;

    /**
     * @description Checks and returned matched prefix, either mention or prefix in config.
     */

    const [matchedPrefix] = content.toLowerCase().match(prefixRegex);

    /**
     * @type {String[]}
     * @description The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
     */

    const args = content.slice(matchedPrefix.length).trim().split(/ +/);

    /**
     * @type {String}
     * @description Name of the command received from first argument of the args array.
     */

    const commandName = args.shift().toLowerCase();

    // Check if mesage does not starts with prefix, or message author is bot. If yes, return.

    if (!message.content.startsWith(matchedPrefix) || message.author.bot)
      return;

    /**
     * @description The message command object.
     * @type {Object}
     */

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    // It it's not a command, return :)

    if (!command) return;

    // Owner Only Property, add in your command properties if true.

    if (command.ownerOnly && message.author.id !== owner) {
      return message.reply({ content: "This is a owner only command!" });
    }

    // Guild Only Property, add in your command properties if true.

    if (command.guildOnly && message.channel.type === "dm") {
      return message.reply({
        content: "I can't execute that command inside DMs!",
      });
    }

    // Author perms property

    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (!authorPerms || !authorPerms.has(command.permissions)) {
        return message.reply({ content: "You can not do this!" });
      }
    }

    // Args missing

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }

      return message.reply({ content: reply });
    }

    // Cooldowns

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply({
          content: `please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${command.name}\` command.`,
        });
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Rest your creativity is below.

    // execute the final command. Put everything above this.
    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply({
        content: "There was an error trying to execute that command!",
      });
    }
  },
};

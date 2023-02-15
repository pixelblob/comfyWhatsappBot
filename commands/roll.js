const { Message } = require('whatsapp-web.js');

module.exports = {
    name: 'roll',
    description: 'A command to check if the bot is working...',
    /**
   * @param { Message } msg
   */
    execute(msg) {
        msg.reply("You rolled a: " + (1 + Math.floor(Math.random() * 6)))
    }
}
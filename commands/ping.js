const { Message } = require('whatsapp-web.js');

module.exports = {
    name: 'ping',
    description: 'A command to check if the bot is working...',
    /**
   * @param { Message } msg
   */
    execute(msg) {
        msg.reply("pong!")
    }
}
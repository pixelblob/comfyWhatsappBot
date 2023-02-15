const { Message } = require('whatsapp-web.js');

module.exports = {
    name: 'remind',
    description: 'A command to check if the bot is working...',
    /**
   * @param { Message } msg
   */
    execute(msg) {
        msg.reply("Remember to: " + msg.body.replace("!remind ", ""))
    }
}
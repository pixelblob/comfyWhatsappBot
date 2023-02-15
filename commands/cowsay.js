const { Message } = require('whatsapp-web.js');
const cowsay = require("cowsay");

module.exports = {
    name: 'cowsay',
    description: 'A command to check if the bot is working...',
    /**
   * @param { Message } msg
   */
    execute(msg) {
        msg.reply(`\`\`\`${cowsay.say({ text: msg.body.replace("!cowsay", "") })}\`\`\``)
    }
}
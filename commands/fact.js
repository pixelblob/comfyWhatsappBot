const { Message } = require('whatsapp-web.js');
const axios = require("axios")

module.exports = {
    name: 'fact',
    description: 'A command to check if the bot is working...',
    /**
   * @param { Message } msg
   */
    execute(msg) {
        axios.get("https://uselessfacts.jsph.pl/random.json?language=en").then(req => {
            console.log(req.data.text)
            msg.reply(`\`\`\`${req.data.text}\`\`\``)
        }).catch(e => {
            console.log(e)
        })
    }
}
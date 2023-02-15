const { Message } = require('whatsapp-web.js');
const axios = require("axios")

module.exports = {
    name: 'djoke',
    description: 'A command to check if the bot is working...',
    /**
   * @param { Message } msg
   */
    execute(msg) {
        axios.get("https://icanhazdadjoke.com/", {headers: {"Accept": "text/plain", "User-Agent": "Whatsapp Bot (https://github.com/pixelblob/comfyWhatsappBot)"}}).then(req=>{
            msg.reply(req.data)
        })
    }
}
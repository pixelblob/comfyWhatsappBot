const { Message } = require('whatsapp-web.js');

module.exports = {
    name: 'cat',
    description: 'A command to check if the bot is working...',
    /**
   * @param { Message } msg
   */
    execute(msg) {
        axios.get("https://cataas.com/cat?json=true").then(async req => {
            console.log(req.data)
            const media = await MessageMedia.fromUrl("https://cataas.com" + req.data.url, { filename: req.data.file, unsafeMime: true })
            msg.reply(media)
            /* const media = new MessageMedia('image/jpeg',req.data)
            msg.reply(media) */
        }).catch(e => {
            console.log(e)
        })
    }
}
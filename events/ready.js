const axios = require("axios");

module.exports = {
    name: 'ready',
    execute(client) {
        console.log('Client is ready!');

        setInterval(() => {
            axios.get("https://uselessfacts.jsph.pl/random.json?language=en").then(req => {
                //console.log(req.data.text)
                client.setStatus(req.data.text).catch(e => {
                    console.log(e)
                })
            }).catch(e => {
                console.log(e)
            })
        }, 10000);
    }
}
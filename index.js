const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const fs = require("fs")

var commands = []
var events = []

console.log("running!")

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/google-chrome-stable',
        handleSIGINT: false, args: ['--no-sandbox']
    }
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    } 
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    var command = require(`./commands/${file}`);
    commands.push({ name: command.name, execute: command.execute })
}

process.on('SIGINT', async () => {
    console.log('(SIGINT) Shutting down...');
    await client.destroy();
    console.log('client destroyed');
    process.exit(0);
});

client.initialize();
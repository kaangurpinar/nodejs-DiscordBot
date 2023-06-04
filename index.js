const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const Discord = require('discord.js');
const { Player } = require('discord-player');

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildVoiceStates
    ]
});

client.commands = new Discord.Collection();
client.slashes = new Discord.Collection();

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

const commandFolders = fs.readdirSync('./commands');
for(const folder of commandFolders){
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for(const file of commandFiles){
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

const slashFolders = fs.readdirSync('./slashes');
for(const folder of slashFolders){
    const slashFiles = fs.readdirSync(`./slashes/${folder}`).filter(file => file.endsWith('.js'));
    for(const file of slashFiles){
        const slash = require(`./slashes/${folder}/${file}`);
        client.slashes.set(slash.data.name, slash);
    }
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for(const file of eventFiles){
    const event = require(`./events/${file}`);
    if(event.once){
        client.once(event.name, (...args) => event.execute(...args, client));
    }else{
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

client.login(process.env.TOKEN);
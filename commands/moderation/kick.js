const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server.',
    guildOnly: true,
    //permissions: 'KICK_MEMBERS',
    execute(message, args){
        if(!message.mentions.users.size){
            return message.reply('You need to tag a user in order to kick them!');
        }
        
        if(message.member.permissions != 'KICK_MEMBERS') return message.reply(`You don't have permission to do that!`);
        
        const taggedUser = message.mentions.members.first();

        if(!taggedUser) return message.reply(`Couldn't find member.`);
        
        if(!taggedUser.kickable) return message.reply(`You can't kick this member.`);

        taggedUser.kick();

        return message.channel.send(`You kicked: ${taggedUser.user.username}`);
    }
};
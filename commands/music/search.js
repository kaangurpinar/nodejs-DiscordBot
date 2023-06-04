const discordVoice = require('@discordjs/voice');
const ytSearchApi = require('youtube-search-api');

module.exports = {
    name: 'search',
    description: 'Search from youtube to play.',
    async execute(message, args){
        if(!message.member.voice.channel){
            return message.reply('You must be in a voice channel!');
        }
        
        const data = await ytSearchApi.GetListByKeyword(args);

        const url = `https://www.youtube.com/watch?v=${data.items[0].id}`;

        console.log(url);
    }
};
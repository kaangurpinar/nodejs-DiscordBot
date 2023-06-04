const discordVoice = require('@discordjs/voice');

module.exports = {
    name: 'join',
    description: 'Joining to channel.',
    async execute(message, args){
        if(!message.member.voice.channel){
            return message.reply('You must be in a voice channel!');
        }
        //const voiceChannel = message.member.voice.channel;
        discordVoice.joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });
    }
};
const discordVoice = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'Play music.',
    async execute(message, args){
        if(!message.member.voice.channel){
            return message.reply('You must be in a voice channel!');
        }
        const url = args[0];
        if(!url){
            return message.reply('No url provided!');
        }
        const stream = ytdl(url, { filter: 'audioonly' });
        const channel = message.member.voice.channel;

        const player = discordVoice.createAudioPlayer({
            behaviors: {
                noSubscriber: discordVoice.NoSubscriberBehavior.Pause
            }
        });
        const resource = discordVoice.createAudioResource(stream);

        const connection = discordVoice.joinVoiceChannel({
            channelId: channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });
        player.play(resource);
        connection.subscribe(player);
        /*
        player.on(discordVoice.AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });*/
    }
};
const { Events } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client){
        if(!interaction.isChatInputCommand()) return;

        const command = client.slashes.get(interaction.commandName);

        if(!command){
            console.error(`No command matching ${interaction.commandName} was found`);
            return;
        }

        try{
            await command.execute(interaction);
        }catch(error){
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
            if(interaction.replied || interaction.deferred){
                await interaction.followUp({ content: `There was an error while executing this command!`, ephemeral: true });
            }else{
                await interaction.reply({ content: `There was an error while executing this command!`, ephemeral: true });
            }
        }
    }
};
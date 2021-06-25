module.exports = {
    name: 'rules',
    description: "Rules of the server.",
    async execute(message, args, Discord, client) {
        const channel = '857757332431699981';
        const visitorRole = message.guild.roles.cache.find(role => role.name === "test");
        
        const visitorEmoji = '👍';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Rules of the server')
            .setDescription('React to this message to see the channels of the server.');
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(visitorEmoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === visitorEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(visitorRole);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === visitorEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(visitorRole);
                }
            } else {
                return;
            }
        });
    }
 
}   

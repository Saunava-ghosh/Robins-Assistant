const { Events , ChannelType} = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const guild = client.guilds.cache.get('1303018252749770802');
		if (guild) {
			guild.channels.cache.forEach(channel => {
				if (channel.type === ChannelType.GuildText) {
					channel.messages.fetch().then(messages => {
						messages.forEach(message => message.delete().catch(console.error));
					}).catch(console.error);
				}
			});
		} else {
			console.log('Guild not found');
		}
	},
};
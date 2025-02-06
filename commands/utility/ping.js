module.exports = {
	data: {
		name : 'ping',
		description : 'Replies with Pong!',
		"integration_types" : [0,1],
		"contexts" : [0,1,2]
	},
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
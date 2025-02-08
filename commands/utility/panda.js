const {EmbedBuilder} = require('discord.js');

async function pandaGen() {
    try {
        const response = await fetch("https://robin-navy.vercel.app/all");
        const data = await response.json();
        const pandas = [data.pic, data.gif]
        return [pandas[Math.floor(Math.random() * pandas.length)],data.fact];
        
    } catch (error) {
        console.error('Error fetching panda img or gif:', error);
        throw error;
    }
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

module.exports = {
    data: {
        name: 'panda',
        description: 'returns a random panda picture or gif with a fact',
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    async execute(interaction) {
        await interaction.deferReply();
        try {
            response = await pandaGen();
        } catch (error) {
            console.error(error);
            response = 'There was an error processing your request.';
        }
        pandaEmbed = new EmbedBuilder()
            .setTitle("Here is your panda!")
            .setDescription("**Did you know?** " + response[1])
            .setImage(response[0])
            .setColor(getRandomHexColor())
            .setTimestamp()
        
        await interaction.editReply({embeds: [pandaEmbed]});
    }
};
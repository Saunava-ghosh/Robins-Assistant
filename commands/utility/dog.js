const {EmbedBuilder} = require('discord.js');

async function dogGen() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        const pickup_line = data.message ;
        return pickup_line;
    } catch (error) {
        console.error('Error fetching pickup line:', error);
        throw error;
    }
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

module.exports = {
    data: {
        name: 'dog',
        description: 'returns a random dog picture',
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    async execute(interaction) {
        await interaction.deferReply();
        try {
            response = await dogGen();
        } catch (error) {
            console.error(error);
            response = 'There was an error processing your request.';
        }
        dogEmbed = new EmbedBuilder()
            .setTitle("Here is your dog!")
            .setImage(response)
            .setColor(getRandomHexColor())
            .setTimestamp()
        
        await interaction.editReply({embeds: [dogEmbed]});
    }
};
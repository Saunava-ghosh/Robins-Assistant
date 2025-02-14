const {EmbedBuilder} = require('discord.js');

async function catGen() {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();
        const cat = data[0].url ;
        console.log(cat);
        
        return cat;
    } catch (error) {
        console.error('Error fetching cat pic:', error);
        throw error;
    }
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

module.exports = {
    data: {
        name: 'cat',
        description: 'returns a random cat picture',
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    async execute(interaction) {
        await interaction.deferReply();
        try {
            response = await catGen();
        } catch (error) {
            console.error(error);
            response = 'There was an error processing your request.';
        }
        catEmbed = new EmbedBuilder()
            .setTitle("Here is your cat!")
            .setImage(response)
            .setColor(getRandomHexColor())
            .setTimestamp()
        
        await interaction.editReply({embeds: [catEmbed]});
    }
};
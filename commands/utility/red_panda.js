const {EmbedBuilder} = require('discord.js');
const {pexelsApiKey} = require('../../config.json');
const {createClient} = require('pexels');

const client = createClient(pexelsApiKey);


async function redPandaGen() {
    try {
        const response = await client.photos.search({ query: 'red panda' });
        const search_data = response.photos;
        const red_pandas = search_data[Math.floor(Math.random() * search_data.length)];
        const red_panda_info = [red_pandas.src.original, red_pandas.photographer];
        console.log(red_panda_info);
        return red_panda_info;
        
    } catch (error) {
        console.error('Error fetching red panda img :', error);
        throw error;
    }
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

module.exports = {
    data: {
        name: 'redpanda',
        description: 'returns a random red panda picture with a fact',
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    async execute(interaction) {
        await interaction.deferReply();
        try {
            response = await redPandaGen();
        } catch (error) {
            console.error(error);
            response = 'There was an error processing your request.';
        }
        redPandaEmbed = new EmbedBuilder()
            .setTitle("Here is your Red Panda!")
            .setImage(response[0])
            .setColor(getRandomHexColor())
            .setFooter({text : `Photo by ${response[1]}`})
            .setTimestamp()
        
        await interaction.editReply({embeds: [redPandaEmbed]});
    }
};
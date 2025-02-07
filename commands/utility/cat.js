const {EmbedBuilder} = require('discord.js');

async function catGen(params) {
    link = ''
    fetchLinks = ["https://cataas.com/cat/gif", "https://cataas.com/cat"];
    if (params.length === 1){
        link = fetchLinks[1] + "/says/" + params[0];
    }
    link = fetchLinks[Math.floor(Math.random() * fetchLinks.length)]
    response = await fetch(link, {headers: {
        'Accept': 'application/json'
      }})
    data = await response.json()
    return data.url;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

module.exports = {
    data: {
        name: 'cat',
        description: 'returns a random cat picture or gif.',
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        "options": [
            {
                "name": "text",
                "description": "returns a cat saying the entered text",
                "type": 3,
                "required": false
            }
        ]
    },
    async execute(interaction) {
        await interaction.deferReply();
        const text = interaction.options.getString("text");
        var response = ''
        if (text) {
            response = await catGen([text]);
        } else {
            response = await catGen([]);
        }
        catEmbed = new EmbedBuilder()
            .setTitle("Here is your cat!")
            .setImage(response)
            .setColor(getRandomHexColor())
            .setTimestamp()

        await interaction.editReply({embeds: [catEmbed]});
    }
};
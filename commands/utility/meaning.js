const {EmbedBuilder} = require("discord.js");

async function meaningGen(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        if (data.title && data.title === 'No Definitions Found') {
            return 'No Definitions Found';
        }
        let meaning = data
        return meaning;
    } catch (error) {
        console.error('Error fetching the meaning of the word:', error);
        throw error;
    }
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
    data: {
        name: 'meaning',
        description: 'find the meaning of a word',
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options : [{
            "name": "word",
            "description": "The word you want to find the meaning of",
            "type": 3,
            "required": true
        },
        {
            "name": "ephemeral",
            "description": "whether the response should be ephemeral(true by default)",
            "type": 3,
            "required": false,
            "choices": [
                {
                    "name": "true",
                    "value": "true"
                },
                {
                    "name": "false",
                    "value": "false"
                }
            ]
        }]
    },
    async execute(interaction) {
        const ephemeral = interaction.options.getString('ephemeral') || 'true';
        await interaction.deferReply({ ephemeral: ephemeral === 'true' });
        const word = interaction.options.getString('word');
        let response;
        try {
            response = await meaningGen(word);
            if (response === 'No Definitions Found') {
                return await interaction.editReply('No Definitions Found for the given word.');
            }
        } catch (error) {
            console.error(error);
            response = 'There was an error processing your request.';
        }
        const meaningEmbed = new EmbedBuilder()
                .setTitle(`${response[0].word ? Capitalize(response[0].word) : 'N/A'}\n/${response[0].phonetics && response[0].phonetics[0] ? response[0].phonetics[0].text : 'N/A'}/`)
                .setDescription(`**Definition:** ${response[0].meanings && response[0].meanings[0] && response[0].meanings[0].definitions && response[0].meanings[0].definitions[0] ? Capitalize(response[0].meanings[0].definitions[0].definition) : 'No descriptions found.'}\n\n**Example:** ${response[0].meanings && response[0].meanings[0] && response[0].meanings[0].definitions && response[0].meanings[0].definitions[0] && response[0].meanings[0].definitions[0].example ? Capitalize(response[0].meanings[0].definitions[0].example) : 'No examples found.'}\n`)
                .setColor(getRandomHexColor())
                .setFooter({text : `Origin: ${response[0].origin ? Capitalize(response[0].origin) : 'No origin found'}`})
        await interaction.editReply({embeds: [meaningEmbed]});
    }
};
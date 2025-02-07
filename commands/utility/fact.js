async function factGen() {
    try {
        const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
        const data = await response.json();
        const fact = data.text;
        const factResponse = `**Did you know?**\n${fact}`;
        return factResponse;
    } catch (error) {
        console.error('Error fetching fact:', error);
        throw error;
    }
}

module.exports = {
    data: {
        name: 'fact',
        description: 'Generates a random fact',
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    async execute(interaction) {

        try {
            response = await factGen();
        } catch (error) {
            console.error(error);
            response = 'There was an error processing your request.';
        }

        await interaction.reply(response);
    }
};
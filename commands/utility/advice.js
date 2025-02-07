async function adviceGen() {
    try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        const advice = data.slip.advice;
        return advice;
    } catch (error) {
        console.error('Error fetching advice:', error);
        throw error;
    }
}

module.exports = {
    data: {
        name: 'advice',
        description: 'Generates random advice for you',
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    async execute(interaction) {
        await interaction.deferReply();
        try {
            response = await adviceGen();
        } catch (error) {
            console.error(error);
            response = 'There was an error processing your request.';
        }

        await interaction.editReply(response);
    }
};
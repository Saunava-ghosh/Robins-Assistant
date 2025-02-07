async function pickupLineGen() {
    try {
        const response = await fetch("https://rizzapi.vercel.app/random");
        const data = await response.json();
        const pickup_line = data.text ;
        return pickup_line;
    } catch (error) {
        console.error('Error fetching pickup line:', error);
        throw error;
    }
}

module.exports = {
    data: {
        name: 'rizz',
        description: 'rizz someone by using a pickup line',
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    async execute(interaction) {
        await interaction.deferReply();
        try {
            response = await pickupLineGen();
        } catch (error) {
            console.error(error);
            response = 'There was an error processing your request.';
        }

        await interaction.editReply(response);
    }
};
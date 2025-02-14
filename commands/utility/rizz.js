async function pickupLineGen() {
    try {
        const response = await fetch("https://api.jcwyt.com/pickup");
        const data = await response.text();
        let pickup_line = data
        if (data.includes("{author}")) {
            pickup_line = data.replace("{author}","")
        }
        if (data.includes("{answer}")) {
            pickup_line = data.replace("{answer}","")
        }
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
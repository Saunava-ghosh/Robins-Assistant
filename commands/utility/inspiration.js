async function inspireGen() {
    try {
        const baseUrl = 'http://api.forismatic.com/api/1.0/';
        
        const response = await fetch(`${baseUrl}?method=getQuote&format=json&lang=en`);
        const data = await response.json();
        const final_response = `"${data.quoteText}" - ${data.quoteAuthor || 'Anonymous'}`;
        return final_response;
    } catch (error) {
        console.error('Error fetching quote:', error);
        throw error;
    }
}

module.exports = {
    data: {
        name: 'inspire',
        description: 'Generates a random inspirational quote',
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    async execute(interaction) {
        await interaction.deferReply();
        try {
            response = await inspireGen();
        } catch (error) {
            console.error(error);
            response = 'There was an error processing your request.';
        }

        await interaction.editReply(response);
    }
};
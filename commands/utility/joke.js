async function jokeGen() {
    try {
        const response = await fetch("https://icanhazdadjoke.com/", {
            headers: {
              'Accept': 'application/json'
            }
          });
        const data = await response.json();
        const joke = data.joke;
        return joke;
    } catch (error) {
        console.error('Error fetching fact:', error);
        throw error;
    }
}

module.exports = {
    data: {
        name: 'joke',
        description: 'Generates a random joke',
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    async execute(interaction) {

        try {
            response = await jokeGen();
        } catch (error) {
            console.error(error);
            response = 'There was an error processing your request.';
        }

        await interaction.reply(response);
    }
};
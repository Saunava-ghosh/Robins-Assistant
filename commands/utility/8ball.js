module.exports = {
    data : {
        name : '8ball',
        description : 'Ask the magic 8ball a question',
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options : [
            {
                name : 'question',
                description : 'The question you want to ask the magic 8ball',
                type : 3,
                required : true
            }
        ]
    },
    async execute(interaction) {
        await interaction.deferReply();
        const question = interaction.options.getString('question');
        const responses = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely no.',
            'Outlook good.',
            'nope.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            `Don't count on it.`,
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        response_text = `You asked: ${question}\n:8ball: Magic 8ball says: ${response}`;
        await interaction.editReply(response_text);
    }
}
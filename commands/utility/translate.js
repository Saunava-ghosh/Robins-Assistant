const tr = require("googletrans").default;
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

async function translate(text, language) {
    try {
        if (language === null) {
            language = 'en';
        }
        const result = await tr(text, { to: language, timeout: 10000 }); // Increased timeout to 10 seconds
        return [result.text, result.src];
    } catch (error) {
        return 'nah';
    }
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translates the given text to the language of choice (English by default)')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to translate')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('language')
                .setDescription('The language to translate to')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply();
        const text = interaction.options.getString('text');
        const language = interaction.options.getString('language') || 'en';
        try {
            const response = await translate(text, language);
            if (response === 'nah') {
                await interaction.editReply('That is not a valid language.');
                return;
            }
            const [result, src] = response;
            let originalLanguage = 'unknown';
            try {
                const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
                originalLanguage = languageNames.of(src) || 'unknown';
            } catch (error) {
                console.error('Error fetching language name:', error);
            }

            const translateEmbed = new EmbedBuilder()
                .setTitle('Translation Result')
                .addFields(
                    { name: 'Original:', value: `${text} (${originalLanguage})` },
                    { name: 'Translation:', value: `${result} (${language})` }
                )
                .setColor(getRandomHexColor());
            await interaction.editReply({ embeds: [translateEmbed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply('There was an error processing your request.');
        }
    }
};
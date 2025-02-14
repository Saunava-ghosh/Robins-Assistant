const {openWeatherApiKey} = require('../../config.json');
const {EmbedBuilder} = require('discord.js');

function Capitalize (str) {
    return str[0].toUpperCase() + str.slice(1);
}
async function weatherGen(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${openWeatherApiKey}&lang=en&units=metric`);
        const data = await response.json();
        const weather = data.weather[0].description;
        const icon = data.weather[0].icon;
        const temp = data.main.temp;
        const feels_like = data.main.feels_like;
        const humidity = data.main.humidity;
        const wind_speed = data.wind.speed;
        const timezone = data.timezone;
        const weather_info = [weather,icon, temp, feels_like, humidity, wind_speed, timezone];
        return weather_info;
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

function timeDisplay(shift) {
    const timeElapsed = Date.now();
    const localTime = new Date(timeElapsed + (shift*1000) + (new Date().getTimezoneOffset()*60000));
    const time = localTime.toLocaleTimeString('en-US', {timeZoneName: 'short'});
    return time.slice(0, 5) + time.slice(8,11); 
}

module.exports = {
    data : {
        name: 'weather',
        description: 'Get the weather of a location',
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options: [
            {
                name: 'location',
                description: 'Location to get the weather of (either city or city, country)',
                type: 3,
                required: true
            }
        ]
    },
    async execute(interaction) {
        await interaction.deferReply();
        const location = interaction.options.getString("location");
        const weatherData = await weatherGen(Capitalize(location));
        const weatherText = `Weather : ${Capitalize(weatherData[0])}\nTemperature : ${weatherData[2]} °C\nFeels like : ${weatherData[3]} °C\nHumidity : ${weatherData[4]}%\nWind Speed : ${(weatherData[5]*(18/5)).toFixed(2)} km/h\nTime : ${timeDisplay(weatherData[6])}`;
        const weatherEmbed = new EmbedBuilder()
            .setTitle(Capitalize(location))
            .setDescription(weatherText)
            .setThumbnail(`https://openweathermap.org/img/wn/${weatherData[1]}@2x.png`)

        await interaction.editReply({embeds : [weatherEmbed]});
    }
}
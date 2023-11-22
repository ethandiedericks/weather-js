const API_KEY = 'ec098ad8088e9ba8ff81a14462b5a7f7';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search-btn');

async function checkWeather(cityName) {
    try {
        const response = await fetch(`${API_URL}${cityName}&appid=${API_KEY}`);
        const data = await response.json();

        console.log(data);

        const img = document.querySelector('.weather-icon');
        const temp = document.querySelector('.temp');
        const city = document.querySelector('.city');
        const humidity = document.querySelector('.humidity');
        const wind = document.querySelector('.wind'); // Corrected selector

        temp.innerHTML = Math.round(data.main.temp);
        city.innerHTML = data.name;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${data.wind.speed} km/h`;

        if (data.weather && data.weather.length > 0) {
            switch (data.weather[0].main) {
                case 'Clouds':
                    img.src = 'images/clouds.png';
                    break;
                case 'Clear':
                    img.src = 'images/clear.png';
                    break;
                case 'Rain':
                    img.src = 'images/rain.png';
                    break;
                case 'Drizzle':
                    img.src = 'images/drizzle.png';
                    break;
                case 'Mist':
                    img.src = 'images/mist.png';
                    break;
                default:
                    img.src = ''; // Set a default image source if the weather condition is not handled
            }
        } else {
            img.src = ''; // Set a default image source if weather data is unavailable
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        checkWeather(searchBox.value);
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener('keypress', handleEnterKey);
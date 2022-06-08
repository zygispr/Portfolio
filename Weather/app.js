// Weather API key: f0db379e567f91c3411f51190b91c4e2
var cityNameInput = document.getElementById('city-input');
var locationName = document.querySelector('.location-name');
var weatherIcon = document.getElementById('weather-icon');
var temperatureDegree = document.querySelector('.temperature-degree');
var temperatureDescription = document.querySelector('.temperature-description');
var highTemperatureDegree = document.querySelector('.high-temperature-degree');
var lowTemperatureDegree = document.querySelector('.low-temperature-degree');

var hourlyForecastTimes = document.getElementsByClassName('hourly-forecast-time');
var hourlyForecastIcons = document.getElementsByClassName('hourly-forecast-icon');
var hourlyForecastDegrees = document.getElementsByClassName('hourly-forecast-degree');
var hourlyForecastButton = document.getElementsByClassName('hourly-forecast-button');

var dailyForecastDays = document.getElementsByClassName('daily-forecast-day');
var dailyForecastIcons = document.getElementsByClassName('daily-forecast-icon');
var dailyForecastDegreesMin = document.getElementsByClassName('daily-forecast-degree-min');
var dailyForecastDegreesMax = document.getElementsByClassName('daily-forecast-degree-max');
var dailyForecastDegreesDash = document.querySelectorAll('.daily-forecast-degree-interval > span');

var UVIndex = document.querySelector('.uv-index');
var UVIndexDescription = document.querySelector('.uv-index-description');

var sunriseSunsetTitle = document.querySelector('.sunrise-sunset-section > span');
var sunriseSunsetMain = document.querySelector('.sunrise-sunset-main');
var sunriseSunsetSecond = document.querySelector('.sunrise-sunset-second');

var feelsLikeDegree = document.querySelector('.feels-like-degree');
var humidityMain = document.querySelector('.humidity-main');
var humiditySecond = document.querySelector('.humidity-second');

var visibilityDistance = document.querySelector('.visibility-distance');
var windSpeed = document.querySelector('.wind-speed');
var windDirection = document.querySelector('.wind-direction');

var longitude;
var latitude;
var weatherApi;
var hourlyDailyApi;
var index;
var hourlyForecastObjectArray;
var hourlyForecastContainersCount = 5;

// Užloadinus puslapį iškart iškviečia getCurrentLocation()
window.addEventListener('load', () => {
    getCurrentLocation();
});

// Panaudoja datą iš pirmo API (basic info)
function fetchWeatherData(data) {
    if (data.cod === 200) {
        // console.log(data);

        // Set Location name
        locationName.textContent = data.name;

        // Set Weather icon near Location name
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;

        // Set Temperature at Location
        temperatureDegree.textContent = Math.round(data.main.temp) + '˚';

        // Set Temperature description
        temperatureDescription.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.substring(1);

        // Set Visibility
        let visibility = Math.floor(data.visibility / 1000);
        visibilityDistance.textContent = `${visibility} km`;

        // Set Wind
        windSpeed.textContent = `${parseFloat(data.wind.speed.toFixed(1))} km/h`;
        let directionDeg = data.wind.deg;
        if (directionDeg >= 0 && directionDeg < 22.5) {
            windDirection.textContent = 'From: N';
        } else if (directionDeg >= 22.5 && directionDeg < 67.5) {
            windDirection.textContent = 'From: NE';
        } else if (directionDeg >= 67.5 && directionDeg < 112.5) {
            windDirection.textContent = 'From: E';
        } else if (directionDeg >= 112.5 && directionDeg < 157.5) {
            windDirection.textContent = 'From: SE';
        } else if (directionDeg >= 157.5 && directionDeg < 202.5) {
            windDirection.textContent = 'From: S';
        } else if (directionDeg >= 202.5 && directionDeg < 247.5) {
            windDirection.textContent = 'From: SW';
        } else if (directionDeg >= 247.5 && directionDeg < 292.5) {
            windDirection.textContent = 'From: W';
        } else if (directionDeg >= 292.5 && directionDeg < 337.5) {
            windDirection.textContent = 'From: NW';
        } else if (directionDeg >= 337.5 && directionDeg <= 360) {
            windDirection.textContent = 'From: N';
        }
    } else {
        console.error(data);
    }
}

// Šita funkcija iškviečiama įrašius kokio nors miesto pavadinimą į input laukelį ir paspaudus mygtuką 'Search'
function searchLocation() {
    var cityName = cityNameInput.value;
    index = 0;

    weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f0db379e567f91c3411f51190b91c4e2&units=metric`;

    fetch(weatherApi)
        .then((weatherData) => weatherData.json())
        .then((weatherData) => {
            fetchWeatherData(weatherData);
            latitude = weatherData.coord.lat;
            longitude = weatherData.coord.lon;

            hourlyDailyApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=f0db379e567f91c3411f51190b91c4e2&units=metric`;

            fetch(hourlyDailyApi)
                .then((hourlyDailyForecast) => hourlyDailyForecast.json())
                .then((hourlyDailyForecast) => {
                    fetchHourlyDailyForecast(hourlyDailyForecast);
                });
        });

    cityNameInput.value = '';
}

// Šita funkcija iškviečiama paspaudus mygtuką 'Get current location'
function getCurrentLocation() {
    index = 0;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f0db379e567f91c3411f51190b91c4e2&units=metric`;

            fetch(weatherApi)
                .then((weatherData) => weatherData.json())
                .then((weatherData) => {
                    fetchWeatherData(weatherData);
                });

            hourlyDailyApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=f0db379e567f91c3411f51190b91c4e2&units=metric`;

            fetch(hourlyDailyApi)
                .then((hourlyDailyForecast) => hourlyDailyForecast.json())
                .then((hourlyDailyForecast) => {
                    fetchHourlyDailyForecast(hourlyDailyForecast);
                    document.querySelector('body').style.opacity = '1';
                });
        });
    } else {
        document.querySelector('.location-timezone').innerText = 'Could not get your location';
    }
}

// Panaudoja datą iš antro API
function fetchHourlyDailyForecast(data) {
    // console.log(data);

    highTemperatureDegree.textContent = `H: ${Math.round(data.daily[0].temp.max)}˚`;
    lowTemperatureDegree.textContent = `L: ${Math.round(data.daily[0].temp.min)}˚`;

    // Get Hourly data and store it to an hourlyForecastObjectArray
    hourlyForecastObjectArray = [];
    let currentHour = new Date().getHours();
    let hour;
    for (let i = 0; i < data.hourly.length; i++) {
        hour = currentHour + i;
        if (hour >= 24) {
            while (hour >= 24) {
                hour -= 24;
            }
        }
        if (hour < 10) hour = '0' + hour;
        hourlyForecastObjectArray[i] = {
            hour: hour,
            icon: data.hourly[i].weather[0].icon,
            degree: `${Math.round(data.hourly[i].temp)}˚`,
        };
        hourlyForecastObjectArray[0].hour = 'Now';
    }

    // Set data of Hourly Forecast DOM elements
    for (let i = 0; i < hourlyForecastContainersCount; i++) {
        // Set hour
        hourlyForecastTimes[i].textContent = hourlyForecastObjectArray[i].hour;

        // Set icon
        hourlyForecastIcons[i].innerHTML = `<img src="http://openweathermap.org/img/wn/${hourlyForecastObjectArray[i].icon}.png">`;

        // Set degree
        hourlyForecastDegrees[i].textContent = hourlyForecastObjectArray[i].degree;
    }

    hourlyForecastButton[0].style.opacity = '0';
    hourlyForecastButton[0].style.cursor = 'default';
    hourlyForecastButton[1].style.opacity = '1';
    hourlyForecastButton[1].style.cursor = 'pointer';

    let currentDay = new Date().getDay();
    let day;
    // Set data of Daily Forecast DOM elements
    for (let i = 0; i < data.daily.length; i++) {
        // Set day
        day = currentDay + i;
        if (day >= 7) day -= 7;
        switch (day) {
            case 0:
                dailyForecastDays[i].textContent = 'Sun';
                break;
            case 1:
                dailyForecastDays[i].textContent = 'Mon';
                break;
            case 2:
                dailyForecastDays[i].textContent = 'Tue';
                break;
            case 3:
                dailyForecastDays[i].textContent = 'Wed';
                break;
            case 4:
                dailyForecastDays[i].textContent = 'Thu';
                break;
            case 5:
                dailyForecastDays[i].textContent = 'Fri';
                break;
            case 6:
                dailyForecastDays[i].textContent = 'Sat';
                break;
        }
        dailyForecastDays[0].textContent = 'Today';

        // Set icon
        dailyForecastIcons[i].innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png">`;

        // Set degree interval
        dailyForecastDegreesMin[i].textContent = Math.round(data.daily[i].temp.min) + '˚';
        dailyForecastDegreesDash[i].textContent = '–––';
        dailyForecastDegreesMax[i].textContent = Math.round(data.daily[i].temp.max) + '˚';
    }

    // Set UV index
    UVIndex.textContent = data.current.uvi;
    switch (data.current.uvi) {
        case 0:
        case 1:
        case 2:
            UVIndexDescription.textContent = 'Low';
            break;
        case 3:
        case 4:
        case 5:
            UVIndexDescription.textContent = 'Moderate';
            break;
        case 6:
        case 7:
            UVIndexDescription.textContent = 'High';
            break;
        case 8:
        case 9:
        case 10:
            UVIndexDescription.textContent = 'Very high';
            break;
        case 11:
            UVIndexDescription.textContent = 'Extreme';
            break;
        default:
            UVIndexDescription.textContent = 'Extreme';
    }

    // Set Sunrise/Sunset
    let currentTime = new Date(data.current.dt * 1000);
    let sunrise = new Date(data.current.sunrise * 1000);
    let sunset = new Date(data.current.sunset * 1000);

    let sunriseHours = sunrise.getHours();
    let sunriseMinutes = sunrise.getMinutes();
    let sunsetHours = sunset.getHours();
    let sunsetMinutes = sunset.getMinutes();
    if (sunriseHours < 10) sunriseHours = '0' + sunriseHours;
    if (sunriseMinutes < 10) sunriseMinutes = '0' + sunriseMinutes;
    if (sunsetHours < 10) sunsetHours = '0' + sunsetHours;
    if (sunsetMinutes < 10) sunsetMinutes = '0' + sunsetMinutes;

    if (currentTime.getHours() > sunsetHours || (currentTime.getHours() === sunsetHours && currentTime.getMinutes() > sunsetMinutes)) {
        sunriseSunsetTitle.textContent = 'SUNRISE';
        sunriseSunsetMain.textContent = `${sunriseHours}:${sunriseMinutes}`;
        sunriseSunsetSecond.textContent = `Sunset: ${sunsetHours}:${sunsetMinutes}`;
    } else {
        sunriseSunsetTitle.textContent = 'SUNSET';
        sunriseSunsetMain.textContent = `${sunsetHours}:${sunsetMinutes}`;
        sunriseSunsetSecond.textContent = `Sunrise: ${sunriseHours}:${sunriseMinutes}`;
    }

    // Set Feels Like temperature
    feelsLikeDegree.textContent = `${Math.round(data.current.feels_like)}˚`;

    // Set Humidity
    humidityMain.textContent = `${data.current.humidity}%`;
    humiditySecond.textContent = `Dew point: ${Math.round(data.current.dew_point)}˚`;
}

// Šitą funkcija išviečiama paspaudus 'HOURLY FORECAST' mygtuką į šoną (kairę arba dešinę)
function hourlyForecastShift(direction) {
    if (direction === 'right' && index < hourlyForecastObjectArray.length - hourlyForecastContainersCount) {
        index++;
    } else if (direction === 'left' && index > 0) {
        index--;
    }

    // Set opacity and cursor of Hourly Forecast Shift buttons
    if (index === 0) {
        hourlyForecastButton[0].style.opacity = '0';
        hourlyForecastButton[0].style.cursor = 'default';
        hourlyForecastButton[1].style.opacity = '1';
        hourlyForecastButton[1].style.cursor = 'pointer';
    } else if (index > 0 && index < hourlyForecastObjectArray.length - hourlyForecastContainersCount) {
        hourlyForecastButton[0].style.opacity = '1';
        hourlyForecastButton[0].style.cursor = 'pointer';
        hourlyForecastButton[1].style.opacity = '1';
        hourlyForecastButton[1].style.cursor = 'pointer';
    } else if (index === hourlyForecastObjectArray.length - hourlyForecastContainersCount) {
        hourlyForecastButton[0].style.opacity = '1';
        hourlyForecastButton[0].style.cursor = 'pointer';
        hourlyForecastButton[1].style.opacity = '0';
        hourlyForecastButton[1].style.cursor = 'default';
    }

    // Set data of Hourly Forecast DOM elements
    for (let i = 0; i < hourlyForecastContainersCount; i++) {
        // Set hours
        hourlyForecastTimes[i].textContent = hourlyForecastObjectArray[i + index].hour;

        // Set icons
        hourlyForecastIcons[i].innerHTML = `<img src="http://openweathermap.org/img/wn/${hourlyForecastObjectArray[i + index].icon}.png">`;

        // Set degrees
        hourlyForecastDegrees[i].textContent = hourlyForecastObjectArray[i + index].degree;
    }
}

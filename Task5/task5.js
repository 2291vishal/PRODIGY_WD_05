document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'e57ebe25c5e747009b0875a7d92fb5a7';  // Your OpenWeatherMap API key
    const weatherDisplay = document.getElementById('weatherDisplay');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const conditions = document.getElementById('conditions');
    const humidity = document.getElementById('humidity');
    
    const locationInput = document.getElementById('locationInput');
    const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
    const useLocationBtn = document.getElementById('useLocationBtn');
    
    // Fetch weather by city name
    fetchWeatherBtn.addEventListener('click', () => {
        const city = locationInput.value;
        if (city) {
            fetchWeatherByCity(city);
        }
    });
    
    // Fetch weather by geolocation
    useLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });
    
    // Function to fetch weather by city name
    function fetchWeatherByCity(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }
    
    // Function to fetch weather by coordinates
    function fetchWeatherByCoords(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }
    
    // Function to display the fetched weather data on the page
    function displayWeather(data) {
        if (data.cod === 200) {
            weatherDisplay.style.display = 'block';
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            temperature.textContent = `Temperature: ${data.main.temp} °C`;
            conditions.textContent = `Conditions: ${data.weather[0].description}`;
            humidity.textContent = `Humidity: ${data.main.humidity} %`;
        } else {
            alert('City not found');
        }
    }
});

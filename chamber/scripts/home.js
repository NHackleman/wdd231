document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '50c063781d991fc741c7bfdb5498f727'; // Your OpenWeatherMap API Key
    const weatherLocation = 'New York,US'; // City and country code

    // DOM Elements for Weather
    const currentTempEl = document.getElementById('current-temp');
    const weatherDescEl = document.getElementById('weather-desc');
    const weatherIconEl = document.getElementById('weather-icon');
    const forecastContainerEl = document.getElementById('forecast-container');
    const weatherLocationEl = document.getElementById('weather-location');

    // DOM Elements for Spotlights
    const spotlightContainerEl = document.querySelector('#spotlights .spotlight-container');

    // --- Fetch Weather Data ---
    async function fetchWeather() {
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherLocation}&appid=${apiKey}&units=imperial`; // or 'metric' for Celsius
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${weatherLocation}&appid=${apiKey}&units=imperial`; // or 'metric'

        try {
            // Fetch current weather
            const currentResponse = await fetch(currentWeatherUrl);
            if (!currentResponse.ok) throw new Error(`Weather data fetch failed: ${currentResponse.status}`);
            const currentData = await currentResponse.json();
            displayCurrentWeather(currentData);

            // Fetch forecast
            const forecastResponse = await fetch(forecastUrl);
            if (!forecastResponse.ok) throw new Error(`Forecast data fetch failed: ${forecastResponse.status}`);
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);

        } catch (error) {
            console.error('Error fetching weather:', error);
            if (currentTempEl) currentTempEl.textContent = 'N/A';
            if (weatherDescEl) weatherDescEl.textContent = 'Could not load weather data.';
        }
    }

    function displayCurrentWeather(data) {
        if (!currentTempEl || !weatherDescEl || !weatherIconEl || !weatherLocationEl) return;

        weatherLocationEl.textContent = data.name; // Display city name from API
        currentTempEl.textContent = Math.round(data.main.temp);
        const description = data.weather[0].description;
        weatherDescEl.textContent = description.charAt(0).toUpperCase() + description.slice(1);
        weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIconEl.alt = description;
        weatherIconEl.style.display = 'block';
    }

    function displayForecast(data) {
        if (!forecastContainerEl) return;
        forecastContainerEl.innerHTML = ''; // Clear previous forecast

        // Get daily forecast (typically OpenWeatherMap gives 3-hour intervals, so we pick one per day)
        const dailyForecasts = {};
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            // Store the first forecast entry for each day (usually around noon or a consistent time)
            if (!dailyForecasts[dayName] && date.getHours() >= 12) { // Prioritize noonish forecasts
                dailyForecasts[dayName] = item;
            } else if (!dailyForecasts[dayName]) { // Fallback if no noon forecast found for a day yet
                dailyForecasts[dayName] = item;
            }
        });

        let daysDisplayed = 0;
        for (const dayName in dailyForecasts) {
            if (daysDisplayed >= 3) break; // Limit to 3 days

            const item = dailyForecasts[dayName];
            const dayDiv = document.createElement('div');
            dayDiv.className = 'forecast-day';

            const temp = Math.round(item.main.temp);
            const icon = item.weather[0].icon;
            const desc = item.weather[0].description;

            dayDiv.innerHTML = `
                <p><strong>${dayName}</strong></p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" style="width:40px; height:40px;">
                <p>${temp}&deg;F</p>
            `;
            forecastContainerEl.appendChild(dayDiv);
            daysDisplayed++;
        }
    }

    // --- Fetch Member Data for Spotlights ---
    async function fetchAndDisplaySpotlights() {
        if (!spotlightContainerEl) return;

        try {
            const response = await fetch('data/members.json');
            if (!response.ok) throw new Error(`Members data fetch failed: ${response.status}`);
            const members = await response.json();

            // Filter for Gold (level 3) and Silver (level 2) members
            const qualifiedMembers = members.filter(member => member.level === 2 || member.level === 3);

            // Shuffle and select 2 or 3 members
            const shuffledMembers = qualifiedMembers.sort(() => 0.5 - Math.random());
            const selectedCount = Math.random() < 0.5 ? 2 : 3; // Randomly choose 2 or 3
            const spotlightMembers = shuffledMembers.slice(0, Math.min(selectedCount, shuffledMembers.length));

            displaySpotlights(spotlightMembers);

        } catch (error) {
            console.error('Error fetching or displaying spotlights:', error);
            spotlightContainerEl.innerHTML = '<p>Member spotlights are currently unavailable.</p>';
        }
    }

    function displaySpotlights(members) {
        spotlightContainerEl.innerHTML = ''; // Clear previous spotlights

        if (members.length === 0) {
            spotlightContainerEl.innerHTML = '<p>No spotlights to display at this time.</p>';
            return;
        }

        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'member-card'; // Use existing .member-card style
            if (member.level === 3) {
                card.classList.add('gold-member'); // For specific gold styling
            } else if (member.level === 2) {
                card.classList.add('silver-member'); // For specific silver styling
            }

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
                <p class="level level-${member.level}">${member.level === 3 ? 'Gold Member' : 'Silver Member'}</p>
            `;
            // Note: The description field from members.json is not included here as per typical spotlight brevity.
            // Add it if needed: <p>${member.description}</p>
            spotlightContainerEl.appendChild(card);
        });
    }

    // Initial calls
    fetchWeather();
    fetchAndDisplaySpotlights();
});
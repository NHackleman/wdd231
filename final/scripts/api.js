const API_KEY = '50c063781d991fc741c7bfdb5498f727';
const LOCATION = 'New York,US';

export async function fetchWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&units=imperial&appid=${API_KEY}`
        );
        if (!response.ok) throw new Error('Weather fetch failed');
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}
export const getWeatherInfo = (code, isDay = 1) => {
  const codes = {
    0: { desc: 'Clear sky', icon: isDay ? '☀️' : '🌕' },
    1: { desc: 'Mainly clear', icon: isDay ? '🌤️' : '🌑' },
    2: { desc: 'Partly cloudy', icon: isDay ? '⛅' : '☁️' },
    3: { desc: 'Overcast', icon: '☁️' },
    45: { desc: 'Fog', icon: '🌫️' },
    48: { desc: 'Depositing rime fog', icon: '🌫️' },
    51: { desc: 'Light drizzle', icon: '🌧️' },
    53: { desc: 'Moderate drizzle', icon: '🌧️' },
    55: { desc: 'Dense drizzle', icon: '🌧️' },
    56: { desc: 'Light freezing drizzle', icon: '❄️' },
    57: { desc: 'Dense freezing drizzle', icon: '❄️' },
    61: { desc: 'Light rain', icon: '🌦️' },
    63: { desc: 'Moderate rain', icon: '🌧️' },
    65: { desc: 'Heavy rain', icon: '🌧️' },
    66: { desc: 'Light freezing rain', icon: '❄️' },
    67: { desc: 'Heavy freezing rain', icon: '❄️' },
    71: { desc: 'Light snow', icon: '🌨️' },
    73: { desc: 'Moderate snow', icon: '🌨️' },
    75: { desc: 'Heavy snow', icon: '❄️' },
    77: { desc: 'Snow grains', icon: '❄️' },
    80: { desc: 'Light rain showers', icon: '🌦️' },
    81: { desc: 'Moderate rain showers', icon: '🌧️' },
    82: { desc: 'Violent rain showers', icon: '⛈️' },
    85: { desc: 'Light snow showers', icon: '🌨️' },
    86: { desc: 'Heavy snow showers', icon: '❄️' },
    95: { desc: 'Thunderstorm', icon: '⛈️' },
    96: { desc: 'Thunderstorm with light hail', icon: '⛈️' },
    99: { desc: 'Thunderstorm with heavy hail', icon: '⛈️' },
  };

  return codes[code] || { desc: 'Unknown', icon: '❓' };
};

export const getBackgroundClass = (code, isDay = 1) => {
    if (code === 0 || code === 1) return isDay ? 'bg-clear-day' : 'bg-clear-night';
    if (code >= 2 && code <= 48) return 'bg-cloudy';
    if (code >= 51 && code <= 67) return 'bg-rain';
    if (code >= 71 && code <= 77) return 'bg-snow';
    if (code >= 80 && code <= 82) return 'bg-rain';
    if (code >= 85 && code <= 86) return 'bg-snow';
    if (code >= 95) return 'bg-rain';
    return 'bg-default';
};

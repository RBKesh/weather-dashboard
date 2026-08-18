import React, { useState, useEffect } from 'react';
import useGeolocation from './hooks/useGeolocation';
import useWeather from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyChart from './components/HourlyChart';
import ForecastCard from './components/ForecastCard';
import { getBackgroundClass } from './utils/weatherCodes';

function App() {
    const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();
    const [city, setCity] = useState({ name: 'Loading...', lat: null, lon: null });
    const [unit, setUnit] = useState('C');

    useEffect(() => {
        if (latitude && longitude && !city.lat) {
            setCity({ name: 'Current Location', lat: latitude, lon: longitude });
        }
        // fallback if geo fails or takes too long
        if (geoError && !city.lat) {
            setCity({ name: 'London', lat: 51.5074, lon: -0.1278 });
        }
    }, [latitude, longitude, geoError, city.lat]);

    const { data: weatherData, loading: weatherLoading, error: weatherError } = useWeather(city.lat, city.lon);

    const handleCitySelect = (selectedCity) => {
        setCity({
            name: selectedCity.name,
            lat: selectedCity.latitude,
            lon: selectedCity.longitude
        });
    };

    if (geoLoading && !city.lat) {
        return <div className="app bg-default loading-container"><div className="spinner"></div>Finding your location...</div>;
    }

    const currentCode = weatherData?.current?.weather_code || 0;
    const isDay = weatherData?.current?.is_day ?? 1;
    const bgClass = getBackgroundClass(currentCode, isDay);

    return (
        <div className={`app ${bgClass}`}>
            <div className="container">
                <header>
                    <SearchBar onCitySelect={handleCitySelect} />
                    <div className="unit-toggle">
                        <button className={`unit-btn ${unit === 'C' ? 'active' : ''}`} onClick={() => setUnit('C')}>°C</button>
                        <button className={`unit-btn ${unit === 'F' ? 'active' : ''}`} onClick={() => setUnit('F')}>°F</button>
                    </div>
                </header>

                {weatherError && <div className="error-message">{weatherError}</div>}
                
                {weatherLoading && !weatherData && (
                    <div className="loading-container" style={{ minHeight: '60vh' }}>
                        <div className="spinner"></div>
                        Fetching weather...
                    </div>
                )}

                {weatherData && (
                    <div className="main-content">
                        <div className="left-column">
                            <CurrentWeather current={weatherData.current} city={city} unit={unit} />
                        </div>
                        
                        <div className="right-column">
                            <HourlyChart hourlyData={weatherData.hourly} unit={unit} />
                            
                            <div className="glass-card">
                                <h3 className="forecast-title">7-Day Forecast</h3>
                                <div className="forecast-list">
                                    {weatherData.daily.time.map((time, index) => (
                                        <ForecastCard
                                            key={time}
                                            date={time}
                                            maxTemp={weatherData.daily.temperature_2m_max[index]}
                                            minTemp={weatherData.daily.temperature_2m_min[index]}
                                            code={weatherData.daily.weather_code[index]}
                                            unit={unit}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;

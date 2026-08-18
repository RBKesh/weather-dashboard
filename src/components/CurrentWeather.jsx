import React from 'react';
import { Droplets, Wind, Thermometer } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { getWeatherInfo } from '../utils/weatherCodes';
import { formatTemp, formatSpeed, formatDate } from '../utils/formatters';

const CurrentWeather = ({ current, city, unit }) => {
    if (!current) return null;

    const { desc } = getWeatherInfo(current.weather_code, current.is_day);

    return (
        <div className="glass-card current-weather">
            <h2 className="city-name">{city.name}</h2>
            <div className="date-time">{formatDate(new Date())}</div>

            <div className="temp-container">
                <WeatherIcon code={current.weather_code} isDay={current.is_day} size="4rem" />
                <span className="main-temp">
                    {formatTemp(current.temperature_2m, unit)}°
                </span>
            </div>

            <div className="weather-desc">{desc}</div>

            <div className="weather-details">
                <div className="detail-item">
                    <Thermometer className="detail-icon" size={24} />
                    <div className="detail-info">
                        <span className="detail-label">Feels Like</span>
                        <span className="detail-value">{formatTemp(current.apparent_temperature, unit)}°</span>
                    </div>
                </div>
                <div className="detail-item">
                    <Wind className="detail-icon" size={24} />
                    <div className="detail-info">
                        <span className="detail-label">Wind</span>
                        <span className="detail-value">{formatSpeed(current.wind_speed_10m, unit)}</span>
                    </div>
                </div>
                <div className="detail-item">
                    <Droplets className="detail-icon" size={24} />
                    <div className="detail-info">
                        <span className="detail-label">Humidity</span>
                        <span className="detail-value">{current.relative_humidity_2m}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;

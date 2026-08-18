import React from 'react';
import WeatherIcon from './WeatherIcon';
import { formatTemp } from '../utils/formatters';

const ForecastCard = ({ date, maxTemp, minTemp, code, unit }) => {
    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

    return (
        <div className="forecast-card">
            <div className="forecast-day">{dayName}</div>
            <div className="forecast-icon">
                <WeatherIcon code={code} size="1.5rem" />
            </div>
            <div className="forecast-temps">
                <span className="forecast-temp-max">{formatTemp(maxTemp, unit)}°</span>
                <span className="forecast-temp-min">{formatTemp(minTemp, unit)}°</span>
            </div>
        </div>
    );
};

export default ForecastCard;

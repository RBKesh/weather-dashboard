import React from 'react';
import { getWeatherInfo } from '../utils/weatherCodes';

const WeatherIcon = ({ code, isDay = 1, size = '2rem' }) => {
    const { icon } = getWeatherInfo(code, isDay);
    return (
        <span style={{ fontSize: size, lineHeight: 1 }}>
            {icon}
        </span>
    );
};

export default WeatherIcon;

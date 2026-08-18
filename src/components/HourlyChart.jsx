import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatTemp } from '../utils/formatters';

const HourlyChart = ({ hourlyData, unit }) => {
    if (!hourlyData || !hourlyData.time) return null;

    // Get next 24 hours
    const now = new Date();
    const currentIndex = hourlyData.time.findIndex(timeStr => new Date(timeStr) > now) - 1;
    const startIndex = Math.max(0, currentIndex);
    const endIndex = startIndex + 24;

    const data = hourlyData.time.slice(startIndex, endIndex).map((timeStr, index) => {
        const fullIndex = startIndex + index;
        const date = new Date(timeStr);
        const temp = formatTemp(hourlyData.temperature_2m[fullIndex], unit);
        
        return {
            time: date.getHours() === 0 ? 'Midnight' : date.toLocaleTimeString('en-US', { hour: 'numeric' }),
            temp: temp
        };
    });

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ background: 'rgba(0,0,0,0.8)', color: 'white', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <p style={{ margin: 0, fontSize: '0.875rem' }}>{label}</p>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{payload[0].value}°{unit}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-card hourly-chart-container">
            <h3 className="chart-title">24-Hour Forecast</h3>
            <div style={{ width: '100%', height: 'calc(100% - 2rem)' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="time" stroke="inherit" tick={{ fill: 'inherit', fontSize: 12 }} />
                        <YAxis stroke="inherit" tick={{ fill: 'inherit', fontSize: 12 }} domain={['dataMin - 2', 'dataMax + 2']} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="temp" stroke="#fff" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#fff' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default HourlyChart;

export const formatTemp = (celsius, unit) => {
    if (celsius === null || celsius === undefined) return '--';
    if (unit === 'F') {
        return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
};

export const formatSpeed = (kmh, unit) => {
    if (kmh === null || kmh === undefined) return '--';
    if (unit === 'F') { // Imperial (mph)
        return `${Math.round(kmh * 0.621371)} mph`;
    }
    return `${Math.round(kmh)} km/h`;
};

export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

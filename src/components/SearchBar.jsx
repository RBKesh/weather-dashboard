import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';

const SearchBar = ({ onCitySelect }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (query.length > 2) {
                try {
                    const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`);
                    if (res.data.results) {
                        setResults(res.data.results);
                        setShowResults(true);
                    } else {
                        setResults([]);
                    }
                } catch (error) {
                    console.error("Geocoding error", error);
                }
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelect = (city) => {
        onCitySelect(city);
        setQuery('');
        setShowResults(false);
    };

    return (
        <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
                type="text"
                className="search-input"
                placeholder="Search for a city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => { if (results.length > 0) setShowResults(true); }}
            />
            {showResults && results.length > 0 && (
                <div className="search-results">
                    {results.map((city) => (
                        <div key={`${city.id}-${city.latitude}`} className="search-result-item" onClick={() => handleSelect(city)}>
                            <div className="search-result-title">{city.name}</div>
                            <div className="search-result-subtitle">
                                {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;

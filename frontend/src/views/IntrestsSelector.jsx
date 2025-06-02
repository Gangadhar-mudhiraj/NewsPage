import { useState } from 'react';
import cnt from "i18n-iso-countries";

import enLocale from "i18n-iso-countries/langs/en.json";

cnt.registerLocale(enLocale);


const countries = [
    'us', // United States
    'in', // India
    'gb', // United Kingdom
    'de', // Germany
    'fr', // France
    'jp', // Japan
    'au', // Australia
    'ca', // Canada
    'br', // Brazil
    'ru', // Russia
    'cn', // China
    'za', // South Africa
    'it', // Italy
    'es', // Spain
    'mx'  // Mexico
];


const categories = ['sports', 'entertainment', 'technology', 'business', 'health', 'general', 'science',];

const IntrestSelector = ({ onAdd }) => {
    // Default country to 'in' directly
    const [selectedCountry, setSelectedCountry] = useState('us');
    const [selectedCategories, setSelectedCategories] = useState(['general']); // Default selection

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategories(prev =>
            prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
        );
    };

    const handleAdd = () => {
        if (!selectedCountry || selectedCategories.length === 0) return;
        onAdd({ country: selectedCountry, categories: selectedCategories });
        // Reset to default values after add
        setSelectedCountry('in');
        setSelectedCategories(['general']);
    };

    return (
        <div className="mb-6 p-4 border rounded-lg shadow-sm">
            <div className="mb-3">
                <label className="block mb-1 font-semibold">Country:</label>
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="border p-2 w-full"
                >
                    {countries.map(c => (
                        <option key={c} value={c}>
                            {cnt.getName(c.toUpperCase(), "en")}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="block mb-1 font-semibold">Categories:</label>
                <div className="grid grid-cols-2 gap-2">
                    {categories.map(cat => (
                        <label key={cat} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={cat}
                                checked={selectedCategories.includes(cat)}
                                onChange={handleCategoryChange}
                            />
                            <span>{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button
                onClick={handleAdd}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add Preference
            </button>
        </div>
    );
};

export default IntrestSelector;

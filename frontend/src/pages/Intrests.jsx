// Intrests.jsx
import React, { useState } from 'react';
import IntrestSelector from '../views/IntrestsSelector';
// import axios from 'axios';
import { useAuthContext } from "../context/AuthContext"

const Intrests = () => {
    const [preferences, setPreferences] = useState([]);

    const { updatePreferences } = useAuthContext()
    const addPreference = (pref) => {
        const exists = preferences.some(p => p.country === pref.country);
        if (exists) {
            setPreferences(prefs =>
                prefs.map(p =>
                    p.country === pref.country
                        ? { ...p, categories: Array.from(new Set([...p.categories, ...pref.categories])) }
                        : p
                )
            );
        } else {
            setPreferences([...preferences, pref]);
        }
    };

    const removePreference = (country, category) => {
        setPreferences(prefs =>
            prefs.map(p =>
                p.country === country
                    ? { ...p, categories: p.categories.filter(c => c !== category) }
                    : p
            ).filter(p => p.categories.length > 0)
        );
    };

    const handleSubmit = async () => {
        try {

            await updatePreferences(preferences)

        } catch (err) {
            console.error(err);
            alert('Error saving preferences.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Select Your Interests</h1>
            <IntrestSelector onAdd={addPreference} />

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Your Preferences</h2>
                {preferences.map((pref, i) => (
                    <div key={i} className="mb-2">
                        <strong>{pref.country.toUpperCase()}:</strong>{' '}
                        {pref.categories.map((cat, j) => (
                            <span key={j} className="inline-block bg-gray-200 px-2 py-1 rounded mr-2">
                                {cat}
                                <button
                                    className="ml-1 text-red-600"
                                    onClick={() => removePreference(pref.country, cat)}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Save Preferences
            </button>
        </div>
    );
};

export default Intrests;

import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { fetchCustomNews } from '../Services/api';
import NewsCard from '../views/NewsCard';
import Loading from "../Utils/Loading";

const CustomisedNews = () => {
    const { getPreferences, preferences } = useAuthContext();
    const [data, setData] = useState(null);

    useEffect(() => {
        const init = async () => {
            if (!preferences) {
                await getPreferences();
            }

            // Now preferences should be available
            if (preferences) {
                const newsData = await fetchCustomNews(preferences);
                setData(newsData);
            }
        };

        init();
    }, [preferences, getPreferences]);

    if (!data) return <Loading />;

    return (
        <div className="px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-8">Customised News</h1>

            {Object.keys(data).map((countryKey) => (
                <div key={countryKey} className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-1">
                        {countryKey.toUpperCase()}
                    </h2>

                    {Object.keys(data[countryKey]).map((categoryKey) => (
                        <div key={categoryKey} className="ml-4 mb-4">
                            <h3 className="text-xl font-medium text-blue-600 mb-2">
                                {categoryKey.toUpperCase()}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ml-4">
                                {data[countryKey][categoryKey].map((newsItem, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <NewsCard news={newsItem} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>

    );
};

export default CustomisedNews;

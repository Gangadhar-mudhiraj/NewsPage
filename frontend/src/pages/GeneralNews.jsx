import React, { useEffect, useState } from 'react';
import fetchGeneralNews from '../Services/api';
import Loading from '../Utils/Loading';
import Heading from '../Utils/Heading';
import NewsCard from '../views/NewsCard';
import { successToast } from '../Utils/ToastMessages';

const GeneralNews = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            await fetchGeneralNews(setData);
            setLoading(false);
        };
        fetchNews();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Heading text="Current News" />
            {loading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <Loading />
                </div>
            ) : (
                <div className="m-auto mt-6 max-h-[900px] grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto">
                    {data && data.length > 0 ? (
                        data.map((item, index) => <NewsCard key={index} news={item} />)
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No news available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default GeneralNews;

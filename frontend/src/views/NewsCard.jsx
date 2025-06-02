import React from 'react';

const NewsCard = ({ news = {} }) => {




    const dummyData = {
        author: 'Unknown Author',
        title: 'No Title Available',
        description: 'No description provided.',
        url: '#',
        urlToImage:
            'https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg',
        publishedAt: new Date().toISOString(),
        source: { name: 'Unknown Source' },
    };

    const safeValue = (value, fallback) =>
        value && typeof value === 'string' && value.trim().length > 0 ? value : fallback;

    const {
        author,
        title,
        description,
        url,
        urlToImage,
        publishedAt,
        source,
    } = news;

    const finalAuthor = safeValue(author, dummyData.author);
    const finalTitle = safeValue(title, dummyData.title);
    const finalDescription = safeValue(description, dummyData.description);
    const finalUrl = safeValue(url, dummyData.url);
    const finalImage = safeValue(urlToImage, dummyData.urlToImage);
    const finalDate = safeValue(publishedAt, dummyData.publishedAt);
    const finalSource = safeValue(source?.name, dummyData.source.name);

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden my-4 transition-transform hover:scale-105 duration-300">
            <a href={finalUrl} target="_blank" rel="noopener noreferrer">
                <img
                    className="w-full h-48 object-cover sm:h-56 md:h-64"
                    src={finalImage}
                    alt={finalTitle}
                />
                <div className="p-4 space-y-2">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">{finalTitle}</h2>
                    <p className="p-4 text-md text-gray-900">{finalDescription}</p>
                    <div className="text-sm text-gray-700 flex flex-col sm:flex-row justify-between sm:items-center mt-2">
                        <span>By {finalAuthor}</span>
                        <span>{new Date(finalDate).toLocaleString()}</span>
                        <span className="italic">{finalSource}</span>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default NewsCard;

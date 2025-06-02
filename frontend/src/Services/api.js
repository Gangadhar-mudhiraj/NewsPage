import axios from "axios";
import { successToast, failToast } from "../Utils/ToastMessages"; // Added successToast import

export const fetchGeneralNews = async (setData) => {
    try {
        const category = "general";
        const GeneralURL = `https://newsapi.org/v2/top-headlines`;

        const res = await axios.get(GeneralURL, {
            params: {
                country: "us",
                category,
                apiKey: import.meta.env.VITE_API_KEY,
            },
            withCredentials: false,
        });

        if (res.data.articles && res.data.articles.length > 0) {
            setData(res.data.articles);
            successToast("Fetched news");
        } else {
            // No articles found
            setData([]);
            failToast("No news available at the moment");
        }
    } catch (error) {
        failToast("Unable to fetch data", error);
    }
};


export const fetchCustomNews = async (preferences) => {
    const map = {}; // final result structure

    for (const element of preferences) {
        const { country, categories } = element;
        map[country] = map[country] || {}; // ensure country key exists

        for (const category of categories) {
            try {
                const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
                    params: {
                        country,
                        category,
                        apiKey: import.meta.env.VITE_API_KEY
                    }, withCredentials: false
                });

                map[country][category] = response.data.articles; // store articles array
                // console.log(response);
                // console.log(response, category);


            } catch (error) {
                console.error(`Error fetching news for ${country}/${category}:`, error);
                map[country][category] = []; // fallback to empty array
            }
        }
    }

    return map; // return the result so you can use it in a component and call setData(map)
};




export default fetchGeneralNews
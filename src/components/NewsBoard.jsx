import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

export default function NewsBoard({ category }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let URL = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${
      import.meta.env.VITE_API_KEY
    }`;
    fetch(URL).then((res) => 
      res.json().then((data) => {
        setArticles(data.articles);
      })
    );
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger"> News</span>
      </h2>
      {articles.map((news, index) => {
        return <NewsItem key={index} news={news} />;
      })}
    </div>
  );
}

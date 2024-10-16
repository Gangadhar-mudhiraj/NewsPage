import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

export default function NewsBoard({ category }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY
      }`;
    fetch(URL).then((res) =>
      res.json().then((data) => {
        setArticles(data.articles);
      })
    );

  }, [category]);

  return (
    <div>
      <h2 className="text-center text-dark font-weight-bold">
        Latest News<span className="badge bg-danger ms-5"> {category.toUpperCase()}</span>

      </h2>
      {articles.map((news, index) => {
        return news && <NewsItem key={index} news={news} />;
      })}
    </div>
  );
}

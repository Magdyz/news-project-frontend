import axios from "axios";
import { useEffect, useState } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://project-nc-news-xu65.onrender.com/api/articles")
      .then(({ data }) => {
        setArticles(data.articles);
        console.log(data.articles);
      });
  }, []);

  return (
    <div className="feed">
      {articles.map((article) => {
        return (
          <div className="articlesHome">
            <h3>{article.title}</h3>
            <img src={article.article_img_url} alt="" />
            <p>created: {article.created_at}</p>
            <h3>{article.votes} votes</h3>
            <h3>{article.comment_count} comments</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Articles;

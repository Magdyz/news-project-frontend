import axios from "axios";
import { useEffect, useState } from "react";
import formatDate from "../utils/dateFormatter";
import { Link } from "react-router-dom";
import ArticleStyling from "./styling/ArticleStyling";

const Articles = ({ topic }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://project-nc-news-xu65.onrender.com/api/articles")
      .then(({ data }) => {
        if (!topic) {
          setArticles(data.articles);
        } else {
          setArticles(
            data.articles.filter((articleBytopic) => {
              return articleBytopic.topic === topic;
            })
          );
        }
      });
  }, []);

  return (
    <div className="feed">
      {articles.map((article, index) => {
        return (
          <ArticleStyling key={index}>
            <div className="articlesHome">
              <h3>{article.title}</h3>

              <Link to={`/articles/${article.article_id}`}>
                <img src={article.article_img_url} alt="" />
              </Link>
              <p>created: {formatDate(article.created_at)}</p>
              <div className="footerComments">
                <h3>{article.votes} votes</h3>
                <h3>{article.comment_count} comments</h3>
              </div>
            </div>
          </ArticleStyling>
        );
      })}
    </div>
  );
};

export default Articles;

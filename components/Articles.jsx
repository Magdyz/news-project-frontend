import axios from "axios";
import { useEffect, useState } from "react";
import formatDate from "../utils/dateFormatter";
import { Link } from "react-router-dom";
import ArticleStyling from "./styling/ArticleStyling";
import { Box, CircularProgress } from "@mui/material";
import VoteArticle from "./VoteArticle";

const Articles = ({ topic }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      });
  }, []);

  return (
    <div className="feed">
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        articles.map((article, index) => {
          return (
            <ArticleStyling key={index}>
              <div className="articlesHome">
                <h3>{article.title}</h3>

                <Link to={`/articles/${article.article_id}`}>
                  <img src={article.article_img_url} alt="" />
                </Link>
                <p>created: {formatDate(article.created_at)}</p>

                <div className="footerComments">
                  <h3>{article.comment_count} comments</h3>
                  <div className="voteIcon">
                    <VoteArticle
                      article_id={article.article_id}
                      article={article}
                    />
                  </div>
                </div>
              </div>
            </ArticleStyling>
          );
        })
      )}
    </div>
  );
};

export default Articles;

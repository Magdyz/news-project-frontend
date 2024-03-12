import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../utils/dateFormatter";

const Article = () => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://project-nc-news-xu65.onrender.com/api/articles/${article_id}`
      )
      .then(({ data }) => {
        setArticle(data.article);
      });
  }, []);

  return (
    <div className="singleArticle">
      <h2>{article.title}</h2>
      <img src={article.article_img_url} alt="" />
      <p>{article.body}</p>
      <p>created: {formatDate(article.created_at)}</p>
      <h3>author: {article.author}</h3>
      <h3>votes: {article.votes}</h3>
      <h3>{article.comment_count} comments</h3>
    </div>
  );
};

export default Article;

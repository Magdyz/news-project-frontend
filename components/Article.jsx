import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../utils/dateFormatter";
import Comments from "./Comments";
import ArticleStyling from "./styling/ArticleStyling";
import PostComment from "./PostComment";

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
      <ArticleStyling>
        <h3>{article.title}</h3>
        <img src={article.article_img_url} alt="" />
        <p>{article.body}</p>
        <p>author: {article.author}</p>
        <div className="footerComments">
          <p>created: {formatDate(article.created_at)}</p>
        </div>
        <div className="footerComments">
          <h3>votes: {article.votes}</h3>
          <h3>{article.comment_count} comments</h3>
        </div>
      </ArticleStyling>
      <PostComment article_id={article_id} />

      <Comments article_id={article.article_id} />
    </div>
  );
};

export default Article;

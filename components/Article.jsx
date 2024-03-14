import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../utils/dateFormatter";
import Comments from "./Comments";
import ArticleStyling from "./styling/ArticleStyling";
import PostComment from "./PostComment";
import VoteArticle from "./VoteArticle";
import { Box, CircularProgress } from "@mui/material";

const Article = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const { article_id } = useParams();
  const [commentPosted, setCommentPosted] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://project-nc-news-xu65.onrender.com/api/articles/${article_id}`
      )
      .then(({ data }) => {
        setArticle(data.article);
        setLoading(false);
      });
  }, [commentPosted, article_id]);
  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="singleArticle">
      <ArticleStyling>
        <h3>{article.title}</h3>
        <img src={article.article_img_url} alt="" />
        <p>{article.body}</p>
        <p>author: {article.author}</p>
        <p>created: {formatDate(article.created_at)}</p>
        <div className="footerComments">
          <h3>{article.comment_count} comments</h3>
          <VoteArticle article_id={article.article_id} article={article} />
        </div>
      </ArticleStyling>
      <PostComment
        article_id={article_id}
        setCommentPosted={setCommentPosted}
      />

      <Comments article_id={article.article_id} commentPosted={commentPosted} />
    </div>
  );
};

export default Article;

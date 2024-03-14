import axios from "axios";
import { useEffect, useState } from "react";
import formatDate from "../utils/dateFormatter";
import { Link } from "react-router-dom";
import ArticleStyling from "./styling/ArticleStyling";
import { Box, Button, ButtonGroup, CircularProgress } from "@mui/material";
import VoteArticle from "./VoteArticle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Articles = ({ topic }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("asc")

  useEffect(() => {
    axios
      .get(
        `https://project-nc-news-xu65.onrender.com/api/articles?sorted_by=${sortBy}&order=${order}`
      )
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
  }, [sortBy, articles]);

  return (
    <div className="feed">
      <div className="ascDesc">
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            onClick={() => {
              setOrder("asc");
            }}
          >
            <KeyboardArrowDownIcon/>
          </Button>
          <Button
            onClick={() => {
              setOrder("desc");
            }}
          >
            <KeyboardArrowUpIcon/>
          </Button>
        </ButtonGroup>
      </div>
      <div className="sorting">
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            onClick={() => {
              setSortBy("created_at");
            }}
          >
            date
          </Button>
          <Button
            onClick={() => {
              setSortBy("comment_count");
            }}
          >
            comment count
          </Button>
          <Button
            onClick={() => {
              setSortBy("votes");
            }}
          >
            votes
          </Button>
        </ButtonGroup>
      </div>
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

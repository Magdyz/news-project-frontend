import axios from "axios";
import { useEffect, useState } from "react";
import formatDate from "../utils/dateFormatter";
import { Link } from "react-router-dom";
import ArticleStyling from "./styling/ArticleStyling";
import { Box, Button, ButtonGroup } from "@mui/material";
import VoteArticle from "./VoteArticle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Skeleton from "@mui/material/Skeleton";

const Articles = ({ topic }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("asc");
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`https://project-nc-news-xu65.onrender.com/api/articles`)
      .then(({ data }) => {
        let sortedArticles = data.articles;

        sortedArticles.sort((a, b) => {
          if (sortBy === "created_at") {
            return new Date(a.created_at) - new Date(b.created_at);
          } else if (sortBy === "comment_count") {
            return a.comment_count - b.comment_count;
          } else if (sortBy === "votes") {
            return a.votes - b.votes;
          }
          return 0;
        });

        if (order === "desc") {
          sortedArticles.reverse();
        }

        if (topic) {
          sortedArticles = sortedArticles.filter(
            (article) => article.topic === topic
          );
        }

        setArticles(sortedArticles);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, [sortBy, order, topic]);

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="feed">
      <div className="ascDesc">
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            size="small"
            onClick={() => {
              setOrder("asc");
            }}
          >
            <KeyboardArrowDownIcon />
          </Button>
          <Button
            size="small"
            onClick={() => {
              setOrder("desc");
            }}
          >
            <KeyboardArrowUpIcon />
          </Button>
        </ButtonGroup>
      </div>
      <div className="sorting">
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            size="small"
            onClick={() => {
              setSortBy("created_at");
            }}
          >
            date
          </Button>
          <Button
            size="small"
            onClick={() => {
              setSortBy("comment_count");
            }}
          >
            comment count
          </Button>
          <Button
            size="small"
            onClick={() => {
              setSortBy("votes");
            }}
          >
            votes
          </Button>
        </ButtonGroup>
      </div>
      {loading ? (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {[1, 2, 3].map((index) => (
            <Box
              key={index}
              sx={{
                margin: "1em 0",
                borderRadius: "13px",
                boxShadow: "1px 3px #dddddd75",
              }}
            >
              <Skeleton variant="rectangular" width="100%" height="150px" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="70%" />
            </Box>
          ))}
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

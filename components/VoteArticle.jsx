import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import axios from "axios";
import { useState } from "react";

const VoteArticle = ({ article_id, article }) => {
  const [vote, setVote] = useState(article.votes);
  const [error, setError] = useState(null);

  const addVote = (article_id) => {
    setVote(vote + 1);
    axios
      .patch(
        `https://project-nc-news-xu65.onrender.com/api/articles/${article_id}`,
        { inc_votes: 1 }
      )
      .then(({ data }) => {})
      .catch((err) => {
        setVote(vote - 1);

        return Promise.reject(new Error(err));
      });
  };

  return (
    <>
      {error && <p>Error: {error.message}</p>}

      <button
        onClick={() => {
          addVote(article_id);
        }}
      >
        <p>{vote} votes</p>
        <ThumbUpOffAltIcon />
      </button>
    </>
  );
};

export default VoteArticle;

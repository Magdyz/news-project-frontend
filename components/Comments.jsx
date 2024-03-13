import axios from "axios";
import { useEffect, useState } from "react";
import CardStyling from "./styling/CardStyling";
import formatDate from "../utils/dateFormatter";
import { CircularProgress } from "@mui/material";

const Comments = ({ article_id }) => {
  const [currentComments, setCurrentComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (article_id) {
      axios
        .get(
          `https://project-nc-news-xu65.onrender.com/api/articles/${article_id}/comments`
        )
        .then((data) => {
          setCurrentComments(data.data.comments);
        })
        .catch((err) => {
          return Promise.reject(new Error(err));
        });
      setLoading(false);
    }
  }, [article_id]);

  return (
    <>
      {loading ? (
        <div className="loadingBar">
          <CircularProgress />
          <h3>loading...</h3>
        </div>
      ) : (
        currentComments.map((comment, index) => {
          return (
            <CardStyling key={index}>
              <div className="commentsCard">
                <p>{comment.body}</p>
                <p>By: {comment.author}</p>
                <p>vote: {comment.votes}</p>
                <p>date: {formatDate(comment.created_at)}</p>
              </div>
            </CardStyling>
          );
        })
      )}
    </>
  );
};

export default Comments;

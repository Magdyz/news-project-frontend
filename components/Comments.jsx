import axios from "axios";
import { useEffect, useState } from "react";
import CardStyling from "./styling/CardStyling";
import formatDate from "../utils/dateFormatter";
import { CircularProgress } from "@mui/material";
import DeleteComment from "./DeleteComment";

const Comments = ({ article_id, commentPosted }) => {
  const [currentComments, setCurrentComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onDelete, setOnDelete] = useState("");
  const [error, setError] = useState(null);

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
          setError(err);
        });
      setLoading(false);
    }
  }, [article_id, onDelete, commentPosted]);

  if (error) {
    return (
      <div className="errorMessage">
        <h3>Be the first to comment</h3>
      </div>
    );
  }

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
                <DeleteComment comment={comment} setOnDelete={setOnDelete} />
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

import { Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import axios from "axios";

const DeleteComment = ({ comment, setOnDelete }) => {
  const { currentUser } = useContext(UserContext);
  const deleteCommentById = (comment_id) => {
    axios
      .delete(
        `https://project-nc-news-xu65.onrender.com/api/comments/${comment_id}`
      )
      .then(() => {
        setOnDelete(comment_id);
      })

      .catch((err) => {
        return Promise.reject(new Error(err));
      });
  };

  return (
    <>
      {comment.author === currentUser ? (
        <Button onClick={() => deleteCommentById(comment.comment_id)}>x</Button>
      ) : null}
    </>
  );
};

export default DeleteComment;

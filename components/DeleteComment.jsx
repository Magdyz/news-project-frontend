import { Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

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
        <IconButton
          onClick={() => deleteCommentById(comment.comment_id)}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      ) : null}
    </>
  );
};

export default DeleteComment;

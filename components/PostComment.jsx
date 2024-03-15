import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const PostComment = ({ article_id, setCommentPosted }) => {
  const { currentUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [postComment, setPostComment] = useState("");
  const [error, setError] = useState(null);
  const [isPosting, setIsPosting] = useState(false); 

  const postUsernameComment = (username, body) => {
    setIsPosting(true); 
    axios
      .post(
        `https://project-nc-news-xu65.onrender.com/api/articles/${article_id}/comments`,
        { username: username, body: body }
      )
      .then(() => {
        setCommentPosted(true); 
        setIsPosting(false); // 
      })
      .catch((error) => {
        console.log("Posting Error", error);
        setError("User not found, try registering!");
        setIsPosting(false); 
      });
  };

  return (
    <>
      <div className="postCommentInput">
        <input className="postTextBox"
          placeholder="post a comment..."
          value={postComment}
          onChange={(e) => setPostComment(e.target.value)}
        />
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={() => {
            postUsernameComment(username, postComment);
            setUsername("");
            setPostComment("");
          }}
          disabled={isPosting}
        >
          {isPosting ? <CircularProgress size={24} /> : "Post comment"}
        </button>
      </div>
      {error && <p>{error}</p>}
    </>
  );
};

export default PostComment;

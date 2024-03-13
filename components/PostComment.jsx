import axios from "axios";
import { useEffect, useState } from "react";

const PostComment = ({ article_id }) => {
  const [postComment, setPostComment] = useState("");
  const [username, setUsername] = useState("");
  const [posted, setPosted] = useState(false);
  const [error, setError] = useState(null);

  const postUsernameComment = (username, body) => {
    axios
      .post(
        `https://project-nc-news-xu65.onrender.com/api/articles/${article_id}/comments`,
        { username: username, body: body }
      )
      .catch((error) => {
        console.log("Posting Error", error);
        setError("User not found, try registering!");
      });
  };

  useEffect(() => {
    if (username && postComment && posted) {
      postUsernameComment(username, postComment);
      setPosted(false);
    }
  }, [article_id, postComment, username]);

  const clearForms = () => {
    setUsername("");
    setPostComment("");
  };

  return (
    <>
      <div className="postCommentInput">
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="post a comment..."
          value={postComment}
          onChange={(e) => setPostComment(e.target.value)}
        />
        <button
          onClick={() => {
            setPosted(true);
            postUsernameComment(username, postComment);
            clearForms();
          }}
        >
          post comment
        </button>
      </div>
      {error && <p>{error}</p>}
    </>
  );
};

export default PostComment;

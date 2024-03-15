import { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";
import { Box, Button, CircularProgress, Input } from "@mui/material";
import axios from "axios";

const Login = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const checkValidUser = (user) => {
    setLoading(true);
    axios
      .get(`https://project-nc-news-xu65.onrender.com/api/users`)
      .then(({ data }) => {
        const usersList = data.users.map((eachUser) => eachUser.username);
        const isValidUser = usersList.includes(user);
        setValid(isValidUser);
        setUserMessage(isValidUser ? "" : "User not found, please register!");
        setLoading(false);
        if (!isValidUser) {
          setTimeout(() => setUserMessage(""), 5000);
        }
      })
      .catch((error) => {
        console.error("Error checking user validity:", error);
        setLoading(false);
      });
  };

  const handleLogin = () => {
    setCurrentUser(inputValue);
    checkValidUser(inputValue);
    setSubmittedValue(inputValue);
    setInputValue("");
  };

  return (
    <>
      <div className="login">
        {valid ? <p>Welcome back {submittedValue}</p> : null}
        {userMessage && <p>{userMessage}</p>}
        <Input
          label={!valid ? "Standard warning" : null}
          variant="standard"
          color="warning"
          placeholder="type username..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </div>
    </>
  );
};

export default Login;

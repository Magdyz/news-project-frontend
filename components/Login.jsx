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


  const checkValidUser = (user) => {
    setLoading(true);
    axios
      .get(`https://project-nc-news-xu65.onrender.com/api/users`)
      .then(({ data }) => {
        const usersList = data.users.map((eachUser) => eachUser.username);
        setValid(usersList.includes(user));
        setLoading(false);
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
    setInputValue(""); // Clear input box after submission
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <div className="login">
        {valid ? <p>Welcome {submittedValue}</p> : null}
        <Input
          placeholder="type username..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></Input>
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </>
  );
};

export default Login;

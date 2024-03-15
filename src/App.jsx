import Header from "../components/Header";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Articles from "../components/Articles";
import Article from "../components/Article";
import TopicButton from "../components/TopicButton";
import { useState } from "react";
import { TopicContext } from "../components/context/TopicContext";
import { UserContext } from "../components/context/UserContext";
import NotFound from "../components/NotFound";

function App() {
  const [currentTopic, setCurrentTopic] = useState();
  const [currentUser, setCurrentUser] = useState("");
  const key = currentTopic || "default";

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <TopicContext.Provider value={{ currentTopic, setCurrentTopic }}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/articles/:article_id" element={<Article />} />
            <Route
              path="/:topic"
              element={
                <TopicButton setCurrentTopic={setCurrentTopic} key={key} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </TopicContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

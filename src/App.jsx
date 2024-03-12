import Header from "../components/Header";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Articles from "../components/Articles";
import Article from "../components/Article";
import TopicButton from "../components/TopicButton";
import { useState } from "react";
import { TopicContext } from "../components/context/TopicContext";

function App() {
  const [currentTopic, setCurrentTopic] = useState();

  const key = currentTopic || "default";

  return (
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
        </Routes>
      </div>
    </TopicContext.Provider>
  );
}

export default App;

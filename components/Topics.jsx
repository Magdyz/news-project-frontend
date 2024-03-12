import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TopicContext } from "./context/TopicContext";

function Topics() {
  const [topics, setTopics] = useState(["coding", "football", "cooking"]);
  const { currentTopic, setCurrentTopic } = useContext(TopicContext);

  useEffect(() => {
    axios
      .get("https://project-nc-news-xu65.onrender.com/api/topics")
      .then(({ data }) => {
        setTopics(data.topics);
      });
  }, [currentTopic]);
  return (
    <div className="topicsBar">
      {topics.map((eachTopic, index) => {
        return (
          <h2 className="topicElements" key={index}>
            <Link to={eachTopic.slug}>{eachTopic.slug}</Link>
          </h2>
        );
      })}
    </div>
  );
}

export default Topics;

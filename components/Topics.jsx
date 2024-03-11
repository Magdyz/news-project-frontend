import axios from "axios";
import { useEffect, useState } from "react";
axios;

function Topics() {
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    axios
      .get("https://project-nc-news-xu65.onrender.com/api/topics")
      .then(({ data }) => {
        setTopic(data.topics);
        console.log(data.topics);
      });
  }, []);
  return (
    <div className="topicsBar">
      {topic.map((eachTopic) => {
        return <h2 className="topicElements">{eachTopic.slug}</h2>;
      })}
    </div>
  );
}

export default Topics;

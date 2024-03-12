import { useParams } from "react-router-dom";
import Articles from "./Articles";
import { useEffect } from "react";

const TopicButton = ({ setCurrentTopic }) => {
  const { topic } = useParams();
    
  useEffect(() => {
    setCurrentTopic(topic);
  }, [topic, setCurrentTopic]);
    
  return (
    <>
      <Articles topic={topic} />
    </>
  );
};

export default TopicButton;

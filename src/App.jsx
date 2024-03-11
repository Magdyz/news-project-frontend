import Header from "../components/Header";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Articles from "../components/Articles";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} /> 
      </Routes>
    </div>
  );
}

export default App;

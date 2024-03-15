import { Link } from "react-router-dom";
import Topics from "./Topics";
import Login from "./Login";

const Header = () => {
  return (
    <>
      <div className="headerElements">
        <Link to="/">
          <h2>NC News</h2>
        </Link>
      </div>
      <Login />
      <Topics />
    </>
  );
};

export default Header;

import { Link } from "react-router-dom";
import Topics from "./Topics";

const Header = () => {
  return (
    <>
      <Link to="/">
        <h2>NC News</h2>
      </Link>
      <Topics />
    </>
  );
};

export default Header;

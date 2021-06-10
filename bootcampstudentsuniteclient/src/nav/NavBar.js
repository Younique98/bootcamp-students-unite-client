import { Link } from "react-router-dom";

export const NavBar = (props) => {
  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link className="navbar__link" to="/login">
          Login
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/">
          JobBoards
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/events">
          GroupProjects
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/profile">
          Profile
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/register">
          Sign Up
        </Link>
      </li>
      {localStorage.getItem("lu_token") !== null ? (
        <li className="nav-item">
          <button
            className="nav-link fakeLink"
            onClick={() => {
              localStorage.removeItem("lu_token");
              props.history.push({ pathname: "/" });
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </>
      )}{" "}
    </ul>
  );
};

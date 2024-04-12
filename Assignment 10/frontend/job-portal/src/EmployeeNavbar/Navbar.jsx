import { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ title }) {
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState(title);

  const handleItemClick = (item) => {
    setActiveItem(item);
    navigate(`/${item}`);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <nav className="nav-desk">
        <center>
          <div className="nav-items">
            <ul>
              <li>
                <span
                  onClick={() => handleItemClick("home")}
                  className={activeItem === "home" ? "active" : ""}
                >
                  Home
                </span>
              </li>

              <li>
                <span
                  onClick={() => handleItemClick("listing")}
                  className={activeItem === "listing" ? "active" : ""}
                >
                  Jobs
                </span>
              </li>

              <li>
                <span
                  onClick={() => handleItemClick("gallery")}
                  className={activeItem === "gallery" ? "active" : ""}
                >
                  Gallery
                </span>
              </li>

              <li>
                <span
                  onClick={() => handleItemClick("about")}
                  className={activeItem === "about" ? "active" : ""}
                >
                  About
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleItemClick("contact")}
                  className={activeItem === "contact" ? "active" : ""}
                >
                  Contact
                </span>
              </li>
              <li>
                <span>
                  <a onClick={logout}>Log Out</a>
                </span>
              </li>
            </ul>
          </div>
        </center>
      </nav>
    </div>
  );
}

export default Navbar;

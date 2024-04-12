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
                  onClick={() => handleItemClick("adminHome")}
                  className={activeItem === "adminHome" ? "active" : ""}
                >
                  Employees
                </span>
              </li>

              <li>
                <span
                  onClick={() => handleItemClick("addJobs")}
                  className={activeItem === "addJobs" ? "active" : ""}
                >
                  Add Jobs
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

import Navbar from "../../EmployeeNavbar/Navbar";
import "./About.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function About() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get("http://localhost:5000/user/checkSession", {
        headers: {
          Authorization: "Bearer " + token,
          "User-Type": "Employee",
        },
      })
      .then((res) => {
        if (!res.data.valid) {
          navigate("/");
        } else if (!res.data.userMatch) {
          navigate("/adminForbidden");
        }
      })
      .catch((error) => {
        navigate("/");
      });
  });

  return (
    <div>
      <Navbar title="about" />
      <div className="container-fluid">
        <div className="aboutUs">
          <center>
            <h1>About Job Quest</h1>
          </center>
          <center>
            <h3>
              Job Quest is an information technology (IT) company that
              specializes in recruitment advertising and data services and is on
              a mission to help people find meaningful careers. The privately
              held company was founded in 2015 and is headquartered in West
              Chester, Pennsylvania, but also has an operations center in
              Budapest, Hungary. With us, eligible team members receive a
              benefits package that includes life and disability insurance,
              dental and vision coverage, healthcare, paid parking, and more.
            </h3>
          </center>
        </div>
      </div>
    </div>
  );
}

export default About;

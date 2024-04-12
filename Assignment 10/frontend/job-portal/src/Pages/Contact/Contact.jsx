import Navbar from "../../EmployeeNavbar/Navbar";
import "./Contact.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Contact() {
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
      <Navbar title="contact" />
      <div style={{ marginTop: "40px" }}>
        <div id="left-column">
          <h1 className="contact-title">Get In Touch.</h1>
          <br />
          <form className="input-container">
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Your Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Your Message</label>
              <input
                type="text"
                name="message"
                id="mmessage"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="contact-send-btn">
              Send Message
            </button>
          </form>

          <div>
            <div className="social_links">
              <a
                href="#"
                aria-label="LinkedIn"
                target="_blank"
                className="main_social_links"
              >
                <img className="link_images" src="images/linkedin.png" />
              </a>

              <a
                href="#"
                aria-label="Github"
                target="_blank"
                className="main_social_links"
              >
                <img className="link_images" src="images/github-sign.png" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                target="_blank"
                className="main_social_links"
              >
                <img className="link_images" src="images/bitbucket-sign.png" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                target="_blank"
                className="main_social_links"
              >
                <img className="link_images" src="images/instagram.png" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                target="_blank"
                className="main_social_links"
              >
                <img className="link_images" src="images/twitter-sign.png" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

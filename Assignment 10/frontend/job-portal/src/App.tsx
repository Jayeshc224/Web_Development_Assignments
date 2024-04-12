import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import axios from "axios";
import "./App.css";
import $ from "jquery";

function App() {
  const navigate = useNavigate();

  const userLogin = (event: MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    axios.defaults.withCredentials = true;
    if (validEmail && validPassword) {
      var username = (document.getElementById("emailId") as HTMLInputElement)
        .value;
      var password = (document.getElementById("password") as HTMLInputElement)
        .value;
      axios
        .post("http://localhost:5000/user/authenticate", {
          username: username,
          password: password,
        })
        .then((response) => {
          const { message, userType, token } = response.data;
          sessionStorage.setItem("token", token);
          if (userType === "Admin") {
            navigate("/adminHome");
          } else {
            navigate("/home");
          }
        })
        .catch((error) => {
          alert("Invalid Credentials");
        });
    } else if (!validEmail) {
      document.getElementById("error_emailId").style.display = "block";
    } else if (!validPassword) {
      document.getElementById("error_password").style.display = "block";
    }
  };

  var regExEmail = /([\w\.]+)@northeastern\.edu/;

  var validEmail = false;
  var validPassword = false;

  $(function () {
    $("#emailId").on("keyup", function (e) {
      validationCheck(e, "emailId");
    });

    $("#password").on("keyup", function (e) {
      validationCheck(e, "password");
    });
  });

  const validationCheck = (e: JQuery.TriggeredEvent, idText: String) => {
    var value, type, em;
    value = e.target.value;
    type = idText;
    em = "error_" + type;

    switch (type) {
      case "emailId":
        if (!value.trim().match(regExEmail)) {
          document.getElementById(em).style.display = "block";
          validEmail = false;
        } else {
          document.getElementById(em).style.display = "none";
          validEmail = true;
        }
        break;

      case "password":
        if (value === null || value === undefined || value === "") {
          document.getElementById(em).style.display = "block";
          validPassword = false;
        } else {
          document.getElementById(em).style.display = "none";
          validPassword = true;
        }
        break;
    }
  };
  return (
    <>
      <div id="loginView" style={{ marginTop: "110px" }}>
        <div className="queries">
          <form id="myform">
            <h2 style={{ textAlign: "center" }}>Login</h2>

            <label>Email Id*:</label>
            <input
              type="text"
              name="emailId"
              id="emailId"
              placeholder="yourname@northeastern.edu"
              required
            />
            <br />

            <div id="error_emailId" style={{ display: "none", color: "red" }}>
              Please enter valid email address.
              <br />
            </div>
            <br />

            <label>Password*:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Please enter your password"
              required
            />
            <br />

            <div id="error_password" style={{ display: "none", color: "red" }}>
              Please enter password.
            </div>

            <br />

            <button className="add" onClick={userLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;

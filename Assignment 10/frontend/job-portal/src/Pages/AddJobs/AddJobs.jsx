import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../AdminNavbar/Navbar";
import "./AddJobs.css";

function AddJobs() {
  const navigate = useNavigate();

  const handleAddJob = () => {
    var Company_Name = document.getElementById("name").value;
    var Title = document.getElementById("title").value;
    var Description = document.getElementById("description").value;
    var Salary = document.getElementById("salary").value;

    if (!Company_Name || !Title || !Description || !Salary) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .post("http://localhost:5000/create/job", {
        Company_Name: Company_Name,
        Title: Title,
        Description: Description,
        Salary: Salary,
      })
      .then(function (response) {
        alert("Job Added Successfully!");
        document.getElementById("name").value = "";
        document.getElementById("title").value = "";
        document.getElementById("salary").value = "";
        document.getElementById("description").value = "";
      })
      .catch(function (error) {
        console.error("Error adding data: " + error.message);
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get("http://localhost:5000/user/checkSession", {
        headers: {
          Authorization: "Bearer " + token,
          "User-Type": "Admin",
        },
      })
      .then((res) => {
        if (!res.data.valid) {
          navigate("/");
        } else if (!res.data.userMatch) {
          navigate("/employeeForbidden");
        }
      });
  });

  return (
    <div>
      <Navbar title="addJobs" />
      <div style={{ marginTop: "40px" }}>
        <div id="job-details">
          <h1 className="add-job-title">Enter Details</h1>
          <br />
          <label>Company Name: </label>
          <input type="text" id="name"></input> <br />
          <br />
          <label>Job Title: </label>
          <input type="text" id="title"></input> <br />
          <br />
          <label>Salary: </label>
          <input type="text" id="salary"></input> <br />
          <br />
          <label>Job Description: </label>
          <input type="text" id="description"></input> <br />
          <button id="addButton" className="add-job-btn" onClick={handleAddJob}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddJobs;

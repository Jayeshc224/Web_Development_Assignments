import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Listing.css";
import Navbar from "../../EmployeeNavbar/Navbar";
import Card from "../../Components/Card";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setJobs } from "../../features/jobs";

function Listing() {
  const navigate = useNavigate();
  const { jobs } = useSelector((state) => state.jobs.value);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = jobs.slice(startIndex, endIndex);

  const pageCount = Math.ceil(jobs.length / pageSize);
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

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
        axios.get("http://localhost:5000/get/jobs").then((res) => {
          dispatch(setJobs({ jobs: res.data }));
        });
      })
      .catch((error) => {
        navigate("/");
      });
  }, []);

  return (
    <div>
      <Navbar title="listing" />
      <div className="job-grid">
        {currentPageData.map((job) => (
          <Card
            key={job.id}
            name={job.Company_Name}
            title={job.Title}
            description={job.Description}
            salary={job.Salary}
            applyLink={job.applyLink}
          />
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            style={{
              padding: "10px 15px",
              cursor: "pointer",
              fontWeight: pageNumber === currentPage ? "bold" : "normal",
              background: "#9FAFCA",
              border: "2px solid #0E387A",
              marginBottom: "15px",
            }}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Listing;

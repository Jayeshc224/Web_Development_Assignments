import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../EmployeeNavbar/Navbar";
import "./Home.css";
import axios from "axios";

function Home() {
  const testimonials = [
    {
      id: 1,
      author: "John Doe",
      text: "I found my dream job through this platform! The process was smooth, and I'm grateful for the opportunity.",
      image: "images/testimonial-1.jpg",
    },
    {
      id: 2,
      author: "Jane Smith",
      text: "As an employer, I've had great success in finding qualified candidates here. Highly recommend!",
      image: "images/testimonial-2.jpg",
    },
    {
      id: 3,
      author: "Emily Johnson",
      text: "I've been using this job platform for a few weeks now, and I'm impressed with the variety of job listings available.",
      image: "images/testimonial-3.jpg",
    },
  ];

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
    <>
      <Navbar title="home" />
      <h1 className="header">Testimonials</h1>
      <div className="testimonials">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial">
            <img src={testimonial.image} alt={testimonial.author} />
            <p>{testimonial.text}</p>
            <p className="author">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;

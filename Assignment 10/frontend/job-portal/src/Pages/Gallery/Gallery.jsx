import { useEffect } from "react";
import { Grid, Card, CardMedia } from "@mui/material";
import Navbar from "../../EmployeeNavbar/Navbar";
import "./Gallery.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setGallery } from "../../features/gallery";

const CompanyShowcase = () => {
  const navigate = useNavigate();
  const { gallery } = useSelector((state) => state.gallery.value);
  const dispatch = useDispatch();

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
        console.error("Error:", error);
      });

    axios
      .get("http://localhost:5000/user/getImages")
      .then((res) => {
        dispatch(setGallery({ gallery: res.data }));
      })
      .catch((error) => {
        console.error("Error fetching image paths:", error);
      });
  }, []);

  return (
    <div>
      <Navbar title="gallery" />
      <h2 className="header">Company Showcase</h2>
      <div className="image-grid">
        <Grid container spacing={2}>
          {gallery.map((imagePath, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  src={imagePath}
                  alt={imagePath}
                  key={index}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default CompanyShowcase;

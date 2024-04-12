import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Listing from "./Pages/Listings/Listing";
import Contact from "./Pages/Contact/Contact";
import Gallery from "./Pages/Gallery/Gallery";
import About from "./Pages/About Us/About";
import Home from "./Pages/Home/Home";
import Employees from "./Pages/Employees/Employees";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./features/users";
import jobReducer from "./features/jobs";
import galleryReducer from "./features/gallery";
import EmployeeForbidden from "./Pages/EmployeeForbidden/EmployeeForbidden";
import AdminForbidden from "./Pages/AdminForbidden/AdminForbidden";
import AddJobs from "./Pages/AddJobs/AddJobs";

const store = configureStore({
  reducer: {
    users: userReducer,
    jobs: jobReducer,
    gallery: galleryReducer,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminHome" element={<Employees />} />
        <Route path="/employeeForbidden" element={<EmployeeForbidden />} />
        <Route path="/adminForbidden" element={<AdminForbidden />} />
        <Route path="/addJobs" element={<AddJobs />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

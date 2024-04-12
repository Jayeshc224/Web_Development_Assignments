import { Link } from "react-router-dom";
import "./AdminForbidden.css";

function AdminForbidden() {
  return (
    <div className="container">
      <img src="/images/forbidden.jpg" alt="Forbidden" />
      <p>Admins are not authorized to access this page.</p>
      <Link to="/adminHome">Go back to home page</Link>
    </div>
  );
}

export default AdminForbidden;

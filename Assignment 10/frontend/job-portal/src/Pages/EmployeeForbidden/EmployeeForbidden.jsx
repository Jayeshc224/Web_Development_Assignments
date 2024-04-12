import { Link } from "react-router-dom";
import "./EmployeeForbidden.css";

function EmployeeForbidden() {
  return (
    <div className="container">
      <img src="/images/forbidden.jpg" alt="Forbidden" />
      <p>Employees are not authorized to access this page.</p>
      <Link to="/home">Go back to home page</Link>
    </div>
  );
}

export default EmployeeForbidden;

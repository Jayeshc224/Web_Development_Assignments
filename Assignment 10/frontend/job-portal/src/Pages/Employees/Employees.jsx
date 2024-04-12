import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../AdminNavbar/Navbar";
import { useDispatch } from "react-redux";
import { setUsers } from "../../features/users";
import "./Employees.css";

function Employees() {
  const { users } = useSelector((state) => state.users.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        axios.get("http://localhost:5000/user/getAll").then((res) => {
          dispatch(setUsers({ users: res.data }));
        });
      });
  }, []);

  return (
    <div>
      <Navbar title="adminHome" />
      <div>
        <h2 className="user-header">User List</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employees;

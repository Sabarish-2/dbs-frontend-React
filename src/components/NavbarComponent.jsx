import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigator = useNavigate();

  const navigate = (path) => () => navigator(path);

  const [loggedIn] = useState(sessionStorage.getItem('userId') !== null)
  const [admin] = useState(sessionStorage.getItem('Admin') === "Yes")

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-start align-items-center">
          <h2 className="text-center m-3 ms-0" role="button" onClick={navigate("/home")}>Digital Bookstore Management</h2>
          {loggedIn && !admin &&
            <button className="btn btn-primary m-3" onClick={navigate("/user")}>
              My Reviews
            </button>
          }
          </div>
          {loggedIn && <div className="d-flex justify-content-end">
            <button
              className="btn btn-danger m-3"
              onClick={() => {
                sessionStorage.removeItem("userId");
                sessionStorage.removeItem("Admin");
                window.location.reload();
              }}
            >
              Log Out
            </button>
          </div>}
      </div>
    </>
  );
};

export default NavbarComponent
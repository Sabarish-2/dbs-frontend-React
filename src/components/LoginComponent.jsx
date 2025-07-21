import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/ReviewService";

const LoginComponent = () => {
  const [users, setUsers] = useState([]);
  const [textInPlaceOfUsers, setTextInPlaceOfUsers] = useState("Loading...")
  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data.ourUsersList);
        setTextInPlaceOfUsers("No Users Found");
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="mt-1 list-group">
      <h4 className="list-group-item">Select a User to Login</h4>
        <button
          className="list-group-item list-group-item-action"
          onClick={() => {
            sessionStorage.setItem("Admin", "Yes");
            sessionStorage.setItem("userId", "1");
            window.location.reload();
          }
          }
          style={{ cursor: "pointer", fontWeight: 500 }}
        >
          <strong>Administrator</strong>
        </button>
        {users.length ? users.map((user) => (
          <button
            key={user.userId}
            className="list-group-item list-group-item-action"
            onClick={() => {
              sessionStorage.setItem("userId", user.userId);
              window.location.reload();
            }}
            style={{ cursor: "pointer", fontWeight: 500 }}
          >
            {user.name}
          </button>
        )) : <h4>{textInPlaceOfUsers}</h4>}
      </div>
    </>
  );
};

export default LoginComponent;

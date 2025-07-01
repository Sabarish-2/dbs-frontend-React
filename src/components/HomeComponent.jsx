import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Review from "./Review";

const HomeComponent = () => {
  const navigator = useNavigate();

  const navigate = (path) => () => navigator(path);

  return (
    <>
      <div className="text-center">
        <button className="btn btn-primary m-3" onClick={navigate("/all")}>
          All Reviews
        </button>
        <button className="btn btn-primary m-3" onClick={navigate("/book")}>
          Book Reviews
        </button>
        <button className="btn btn-primary m-3" onClick={navigate("/user")}>
          User Reviews
        </button>
        <button
          className="btn btn-danger m-3"
          onClick={() => {
            sessionStorage.removeItem("userId");
            window.location.reload();
          }}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default HomeComponent;

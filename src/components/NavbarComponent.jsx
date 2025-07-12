import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigator = useNavigate();

  const navigate = (path) => () => navigator(path);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-center d-flex justify-content-start">
          <button className="btn btn-primary m-3" onClick={navigate("/home")}>
            Home
          </button>
          <button className="btn btn-primary m-3" onClick={navigate("/user")}>
            My Reviews
          </button>
        </div>
        <div className="d-flex justify-content-end">
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
        </div>
      </div>
    </>
  );
};

export default NavbarComponent
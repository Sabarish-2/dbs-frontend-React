import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ViewAllReviews from "./components/ViewAllReviewsComponent";
import HomeComponent from "./components/HomeComponent";
import UserReviewsComponent from "./components/UserReviewsComponent";
import RouteCheckComponent from "./components/RouteCheckComponent";
import ViewBookComponent from "./components/Book/ViewBookComponent";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  return (
    <div className="ms-5 me-5 m-3">
      <h2 className="text-center">Digital Bookstore Management</h2>
      <BrowserRouter>
        <RouteCheckComponent>
          <NavbarComponent />
          <Routes>
            <Route path="/all" element={<ViewAllReviews />} />
            <Route path="/book/:bookID" element={<ViewBookComponent />} />
            <Route path="/user" element={<UserReviewsComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/" element={<HomeComponent />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RouteCheckComponent>
      </BrowserRouter>
    </div>
  );
}

export default App;

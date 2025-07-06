import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ViewAllReviews from "./components/ViewAllReviewsComponent";
import HomeComponent from "./components/HomeComponent";
import BookReviewsComponent from "./components/BookReviewsComponent";
import UserReviewsComponent from "./components/UserReviewsComponent";
import RouteCheckComponent from "./components/RouteCheckComponent";
import LoginComponent from "./components/LoginComponent";

function App() {
  return (
    <div className="ms-5 me-5 m-3">
      <h2 className="text-center">Digital Bookstore Management</h2>
      <BrowserRouter>
        <RouteCheckComponent>
          <HomeComponent />
          <Routes>
            <Route
              path="/all"
              element={
                // <RouteCheckComponent>
                <ViewAllReviews />
              }
            />
            <Route
              path="/book"
              element={
                // <RouteCheckComponent>
                <BookReviewsComponent />
              }
            />
            <Route
              path="/user"
              element={
                // <RouteCheckComponent>
                <UserReviewsComponent />
              }
            />
            <Route
              path="/login"
              element={
                <RouteCheckComponent>
                  <LoginComponent />
                </RouteCheckComponent>
              }
            />
          </Routes>
        </RouteCheckComponent>
      </BrowserRouter>
    </div>
  );
}

export default App;

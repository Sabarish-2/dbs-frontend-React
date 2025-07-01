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
    <div className="m-3">
      <h2 className="text-center">Digital Bookstore Management</h2>
      <BrowserRouter>
        <Routes>
          <Route
            path="/all"
            element={
              <RouteCheckComponent>
                <ViewAllReviews />
              </RouteCheckComponent>
            }
          />
          <Route
            path="/book"
            element={
              <RouteCheckComponent>
                <BookReviewsComponent />
              </RouteCheckComponent>
            }
          />
          <Route
            path="/user"
            element={
              <RouteCheckComponent>
                <UserReviewsComponent />
              </RouteCheckComponent>
            }
          />
          {/* <Route
            path="/login"
            element={
              <RouteCheckComponent>
                <LoginComponent />
              </RouteCheckComponent>
            }
          /> */}
          <Route
            path="/*"
            element={
              <RouteCheckComponent>
                <HomeComponent/>
              </RouteCheckComponent>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { getUserReviews, getUsers } from "../services/ReviewService";
import Review from "./Review";

const UserReviewsComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [textInPlaceOfReviews, setTextInPlaceOfReviews] = useState("Loading...");

  useEffect(() => {
    getUserReviews(sessionStorage.getItem("userId"))
      .then((response) => {
        setReviews(response.data);
        setTextInPlaceOfReviews("No Reviews found!");
      })
      .catch((error) => {
        console.error(error);
        setTextInPlaceOfReviews("Error!!");
      });
  }, []);

  return (
    <>
      <h4>Your Reviews</h4>
      <div className="mb-3"></div>
      {typeof reviews === 'string' || reviews.length == 0 ? (<h5>{textInPlaceOfReviews}</h5>) : 
      (
        <>
          {reviews.map((review) => (
            <Review key={review.reviewId} review={review} showBook="true" />
          ))}
        </>
      )}
    </>
  );
};

export default UserReviewsComponent;

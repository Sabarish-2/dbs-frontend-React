import { useEffect, useState } from "react";
import Review from "./Review";
import { getReviews } from "../services/ReviewService";
import { useNavigate } from "react-router-dom";

const ViewAllReviews = () => {
  const navigator = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [textInPlaceOfReviews, setTextInPlaceOfReviews] = useState("Loading...");

  useEffect(() => {
    getReviews()
      .then((response) => {
        setReviews(response.data);
        setTextInPlaceOfReviews((reviews.size == 0)? "No Reviews Found!" : '');
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setTextInPlaceOfReviews("Error Fetching Reviews!");
      });
  }, []);

  return (
    <>
      <button className="btn btn-success m-3" onClick={() => navigator('/')}>Home</button>
      <h3>All Reviews</h3>
      <h5>{textInPlaceOfReviews}</h5>
      {reviews.map((review) => (
        <Review key={review.reviewId} review={review} showBoth='true' />
      ))}
    </>
  );
};

export default ViewAllReviews;

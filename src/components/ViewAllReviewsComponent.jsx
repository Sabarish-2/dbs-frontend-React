import { useEffect, useState } from "react";
import Review from "./Review";
import { getReviews } from "../services/ReviewService";

const ViewAllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [textInPlaceOfReviews, setTextInPlaceOfReviews] = useState("Loading...");

  useEffect(() => {
    getReviews()
      .then((response) => {
        setReviews(response.data);
        setTextInPlaceOfReviews((response.data == 0)? "No Reviews Found!" : '');
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setTextInPlaceOfReviews("Error Fetching Reviews!");
      });
  }, []);

  return (
    <>
      <h3 className="ms-2">All Reviews</h3>
      {(typeof reviews !== 'string' && reviews.length != 0)? reviews.map((review) => (
        <Review key={review.reviewId} review={review} showBoth='true' />
      )) : <h5>{textInPlaceOfReviews}</h5>}
    </>
  );
};

export default ViewAllReviews;

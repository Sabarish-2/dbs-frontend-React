import { useState } from "react";
import StarsComponent from "./StarsComponent";
import { addReview } from "../services/ReviewService";

const AddReviewComponent = ({setUserReview, bookId}) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  const submitReview = (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem("userId");
    const review = {reviewId: 0, rating: rating, comment: comment, userId: userId, bookId: bookId};
    
    addReview(review).then((response) => {
        console.log(response.data);
        setUserReview(review);
      }).catch((error) => {
        console.error("Error adding review:", error);
      })
    }
  
  function handleRatingClick(event, starValue) {
    const rect = event.target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const starWidth = rect.width;

    if (clickX < starWidth / 2) {
      starValue -= 0.5;
    }
    setRating(starValue);
  }

  return (
    <>
      <div className="card p-2 mb-3 shadow-sm" style={{ borderRadius: "1rem" }}>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center">
              <h4>Give your Review:</h4>
            </div>
          </div>
          <form>
            <div className="fa-2x mb-3">
              <StarsComponent handleRatingClick={handleRatingClick} rating={rating} />
            </div>
            <div className="mb-3">
              <label htmlFor="reviewComment" className="form-label">
                <strong>Comment:</strong>
              </label>
              <textarea
                className="form-control"
                id="reviewComment"
                placeholder="Your Comment Here!"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success" onClick={(e) => submitReview(e)}>
              Add Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddReviewComponent;

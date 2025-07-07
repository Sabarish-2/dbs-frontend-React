import { useState } from "react";
import StarsComponent from "./StarsComponent";
import { addReview } from "../services/ReviewService";

const AddReviewComponent = ({setUserReview, bookId}) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({ rating: "", comment: "" });

  const handleEnter = () => {}

  const validateForm = () => {
    let valid = true;
    const errorsTemp = {... errors};
    if (rating == 0) {
      errorsTemp.rating = "Rating Is Required!";
      valid = false;
    } else {
      errorsTemp.rating = "";
    }
    setComment(comment.trim());
    if (comment === "") {
      errorsTemp.comment = "Comment Is Required.";
      valid = false;
    } else if (comment.length < 3) {
      errorsTemp.comment = "Comment Must Be Atleast 3 Characters!";
      valid = false;
    } else if ((comment[0] < 'a' || comment[0] > 'z') && (comment[0] < 'A' || comment[0] > 'Z')) {
      errorsTemp.comment = "Comment Must Start With A Letter!";
      valid = false;
    } else if (comment.length >= 2000) {
      errorsTemp.comment = "Comment Must Be Less Than 2000 Characters!";
      valid = false;
    } else {
      errorsTemp.comment = "";
    }
    return valid;
  }

  const submitReview = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const userId = sessionStorage.getItem("userId");
    const review = {reviewId: 0, rating: rating, comment: comment, userId: userId, bookId: bookId};
    
    addReview(review).then((response) => {
        console.log(response.data);
        setUserReview(response.data);
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
              {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="reviewComment" className="form-label"><strong>Comment:</strong></label>
              <textarea
                className={`form-control` + (errors.comment) && ` is-invalid`}
                id="reviewComment"
                placeholder="Your Comment Here!"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></textarea>
              {errors.comment && <div className="invalid-feedback">{errors.comment}</div>}
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

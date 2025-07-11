import { useEffect, useState } from "react";
import { getBookReviews } from "../../services/ReviewService";
import Review from "../Review";
import EditReviewComponent from "../EditReviewComponent";
import { useParams } from "react-router-dom";

const BookReviewsComponent = () => {
  const [userReview, setUserReview] = useState("");
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [reviews, setReviews] = useState([]);
  const [textInPlaceOfReviews, setTextInPlaceOfReviews] = useState("Loading Reviews...");
  const [editing, setEditing] = useState(true);

  const { bookID } = useParams();

  useEffect(() => {
    getBookReviews(bookID)
    .then((response) => {
      setReviews(response.data);
      setTextInPlaceOfReviews("No Reviews found!");
      if (typeof response.data != 'string') {
        setUserReview(response.data.find((review) => Number(userId) === review.userId));
        setEditing(!response.data.find((review) => Number(userId) === review.userId));
      }
      })
      .catch((error) => {
        console.error(error);
        setTextInPlaceOfReviews("Error fetching reviews!");
      });
  }, []);

  return (
    <>
      <h4>Reviews:</h4>
      {typeof reviews === "string" || reviews.length == 0 ? (
        <h5>{textInPlaceOfReviews}</h5>
      ) : (
        <>
          {userReview && !editing ? (
            <Review
              key={userReview.reviewId}
              review={userReview}
              showUser="true"
              myReview="true"
              editable="true"
              setEditing={setEditing}
            />
          ) : (
            editing && (
              <EditReviewComponent
                review={userReview}
                setUserReview={setUserReview}
                bookId={bookID}
                userId={userId}
                setEditing={setEditing}
              />
            )
          )}
          {reviews
            .filter((review) => Number(userId) !== review.userId)
            .map((review) => (
              <Review key={review.reviewId} review={review} showUser="true" />
            ))}
        </>
      )}
    </>
  );
};

export default BookReviewsComponent;

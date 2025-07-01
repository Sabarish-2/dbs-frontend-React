import { useEffect, useState } from "react";
import { getBookReviews, getBooks } from "../services/ReviewService";
import { useNavigate } from "react-router-dom";
import Review from "./Review";

const BookReviewsComponent = () => {
  const navigator = useNavigate();
  const [books, setBooks] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [reviews, setReviews] = useState([]);
  const [bookSelected, setBookSelected] = useState(false);
  const [textInPlaceOfReviews, setTextInPlaceOfReviews] = useState("Loading...");

useEffect(() => {
    const myReview = reviews.find((review) => Number(userId) === review.userId);
    if (myReview) {
        setUserReview(myReview);
    } else {
        setUserReview("");
    }
}, [reviews, userId]);

function chk() {
    if (userReview) {
        return (
            <Review
                key={userReview.reviewId}
                review={userReview}
                showUser="true"
                myReview="true"
            />
        );
    }
    return null;
}

  useEffect(() => {
    getBooks()
      .then((response) => {
        setBooks(response.data);
        setTextInPlaceOfReviews("No Reviews found!");
      })
      .catch((error) => {
        console.error(error);
        setTextInPlaceOfReviews("Error!");
      });
  }, []);

  return (
    <>
      <button
        className="btn btn-success m-3 text-center"
        onClick={() => navigator("/")}
      >
        Home
      </button>
      <h4>Reviews for Book</h4>
      <div className="mb-3">
        <select
          id="bookSelect"
          className="form-select m-2"
          onChange={(e) => {
            if (e.target.value !== "") {
              getBookReviews(
                books.find((book) => String(book.bookID) === e.target.value)
                  .bookID
              )
                .then((response) => {
                  setReviews(response.data);
                  setBookSelected(true);
                })
                .catch((error) => console.error(error));
            } else {
              setReviews([]);
              setBookSelected(false);
            }
          }}
        >
          <option value="" key="none">
            {" "}
            Choose a book{" "}
          </option>
          {books.map((book) => (
            <option key={book.bookID} value={book.bookID}>
              {book.title}
            </option>
          ))}
        </select>
      </div>
      {reviews.length === 0 && bookSelected ? (
        <h3>{textInPlaceOfReviews}</h3>
      ) : (
        ""
      )}
      {chk()}
      {reviews
        .filter((review) => Number(userId) !== review.userId)
        .map((review) => (
          <Review key={review.reviewId} review={review} showUser="true" />
        ))}
    </>
  );
};

export default BookReviewsComponent;

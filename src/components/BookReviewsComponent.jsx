import { useEffect, useState } from "react";
import { getAverageBookRating, getBookReviews, getBooks } from "../services/ReviewService";
import Review from "./Review";
import StarsComponent from "./StarsComponent";
import EditReviewComponent from "./EditReviewComponent";

const BookReviewsComponent = () => {
  const [books, setBooks] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [reviews, setReviews] = useState([]);
  const [bookSelected, setBookSelected] = useState('');
  const [textInPlaceOfReviews, setTextInPlaceOfReviews] = useState("Loading...");
  const [averageRating, setAverageRating] = useState([]);
  const [editing, setEditing] = useState(true);

  useEffect(() => {
    if (typeof reviews !== "string") {
      setUserReview(reviews.find((review) => Number(userId) === review.userId));
      setEditing(!reviews.find((review) => Number(userId) === review.userId));
    }
  }, [reviews]);

  useEffect(() => {
    getBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
        setTextInPlaceOfReviews("Error!");
      });
  }, []);

  return (
    <>
      <h4>Reviews for Book</h4>
      <div className="mb-3">
        <select
          id="bookSelect"
          className="form-select m-2"
          onChange={(e) => {
            if (e.target.value !== "") {
              getBookReviews(e.target.value)
                .then((response) => {
                  setReviews(response.data);
                  setTextInPlaceOfReviews("No Reviews found!");
                  setBookSelected(e.target.value);
                })
                .catch((error) => {
                  console.error(error);
                  setTextInPlaceOfReviews("Error fetching reviews!");
                });
              getAverageBookRating(e.target.value)
                .then((response) => setAverageRating(response.data))
                .catch((error) => console.error(error));
            } else {
              setReviews([]);
              setBookSelected(false);
              setTextInPlaceOfReviews("Loading...");
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
      {(typeof reviews === "string" || reviews.length == 0) && bookSelected ? (
        <h5>{textInPlaceOfReviews}</h5>
      ) : (
        <>
          {averageRating.length != 0 && reviews.length != 0 && (
            <div className="d-flex justify-content-center">
              <div className="card mb-3 p-3 shadow-sm">
                <h5 className="text-center">
                  Average Rating: <StarsComponent rating={averageRating[0]} /> ({averageRating[1]})
                </h5>
              </div>
            </div>
          )}
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
            bookSelected && editing && <EditReviewComponent review={userReview} setUserReview={setUserReview} bookId={bookSelected} setEditing={setEditing} />
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

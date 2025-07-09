import { useParams } from "react-router-dom";
import {
  getAverageBookRating,
  getBookByID,
} from "../../services/ReviewService";
import { useEffect, useState } from "react";
import StarsComponent from "../StarsComponent";

const BookCardComponent = () => {
  const { bookID } = useParams();
  const [book, setBook] = useState();
  const [averageRating, setAverageRating] = useState([]);
  const [textInPlaceOfBook, setTextInPlaceOfBook] = useState(
    "Loading Book Details..."
  );

  useEffect(() => {
    getBookByID(bookID)
      .then((response) => {
        console.log(response.data);
        setBook(response.data);
        getAverageBookRating(bookID)
          .then((response) => setAverageRating(response.data))
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.error("Error:", error);
        setTextInPlaceOfBook("Error fetching book details!");
        if (error.response.status === 404) {
          setTextInPlaceOfBook("Book not found!");
        }
      });
  }, []);

  return (
    <div>
      {book ? (
        <div className="card mb-3">
          <div className="row g-0 m-3">
            <div className="col-md-4">
              <img
                src={`data:image/jpeg;base64,${book.coverImage}`}
                className="w-50 img-fluid rounded-start"
                alt={book.title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.authorName}</p>
                <p className="card-text">Genre: {book.categoryName}</p>
                <p className="card-text">Price: ₹{book.price}</p>
                <p className="card-text">Description: {book.description}</p>
                {averageRating.length != 0 && (
                  //   <div className="d-flex justify-content-center">
                  <strong>
                    <p>
                      Average Rating:{" "}
                      <StarsComponent rating={averageRating[0]} /> (
                      {averageRating[1]})
                    </p>
                    {/* </div> */}
                  </strong>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>{textInPlaceOfBook}</p>
      )}
    </div>
  );
};

export default BookCardComponent;

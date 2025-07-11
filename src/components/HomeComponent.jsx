import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../services/ReviewService";
import ShortBookCard from "./Book/ShortBookCard";

const HomeComponent = () => {
  const navigator = useNavigate();
  const [bookID, setBookID] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
        gap: "14px",
      }}
    >
      {books.map((book) => (
        <div onClick={() => navigator("/book/" + book.bookID)} key={book.bookID}>
          <ShortBookCard book={book} setBookID={setBookID} />
        </div>
      ))}
    </div>
  );
};

export default HomeComponent;

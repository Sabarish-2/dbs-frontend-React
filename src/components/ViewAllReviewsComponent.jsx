import { useEffect, useState } from "react";
import Review from "./Review";
import { getReviews, getDeletedReviews } from "../services/ReviewService";
import { Tabs, Tab } from "react-bootstrap";

const ViewAllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [deletedReviews, setDeletedReviews] = useState([]);
  const [currentlyShowing, setCurrentlyShowing] = useState("all");
  const [textInPlaceOfReviews, setTextInPlaceOfReviews] = useState("Loading...");
  
  useEffect(() => getAllReviews(), []);
  
  const getAllReviews = () => {
    setCurrentlyShowing("all");
    setReviews([]);
    setTextInPlaceOfReviews('Loading...');
    getReviews()
    .then((response) => {
      setReviews(response.data);
      setTextInPlaceOfReviews((response.data == 0) ? "No Reviews Found!" : 'Loading...');
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setTextInPlaceOfReviews("Error Fetching Reviews!");
      });
  }
  const getAllDeletedReviews = () => {
    setCurrentlyShowing("deleted");
    setDeletedReviews([]);
    setTextInPlaceOfReviews('Loading...');
    getDeletedReviews()
      .then((response) => {
        setDeletedReviews(response.data);
        setTextInPlaceOfReviews((response.data == 0) ? "No Deleted Reviews Found!" : 'Loading...');
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setTextInPlaceOfReviews("Error Fetching Reviews!");
      });
  }

  return (
    <>
      <Tabs
        className="mb-3"
        onSelect={(key) => {
          if (key === "all") getAllReviews();
          else getAllDeletedReviews();
        }}
      >
        <Tab eventKey="all" title="All Reviews"></Tab>
        <Tab eventKey="deleted" title="Deleted Reviews"></Tab>
      </Tabs>

      {/* <h3 className="ms-2">All Reviews</h3> */}
      {currentlyShowing === 'all'? ((typeof reviews !== 'string' && reviews.length != 0) ? reviews.map((review) => (
        <Review key={review.reviewId} review={review} showBoth='true' />
      )) : <h5>{textInPlaceOfReviews}</h5>) : (typeof deletedReviews !== 'string' && deletedReviews.length != 0) ? deletedReviews.map((review) => (
        <Review key={review.reviewId} review={review} showBoth='true' />
      )) : <h5>{textInPlaceOfReviews}</h5>}
    </>
  );
};

export default ViewAllReviews;

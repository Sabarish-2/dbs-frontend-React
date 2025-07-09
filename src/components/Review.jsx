import StarsComponent from "./StarsComponent"
import { deleteReview } from "../services/ReviewService"


const Review = ({ review, showUser = true, showBook = false, showBoth = false, myReview = false, editable = false, setEditing }) => {
  const deleteThisReview = () => {
      if (confirm("Are you sure you want to delete your review?")){
        deleteReview(review.reviewId).then((response) => {
        });
        window.location.reload();
      }
    }
  return (
    <div className="card p-2 mb-3 shadow-sm" style={{ borderRadius: '1rem' }}>
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center">
            {showBoth && (
              <>
                <span className="fw-bold me-2">{review.bookTitle}</span>
                <span className="text-muted">by {review.userName}</span>
              </>
            )}
            {!showBoth && showBook && <span className="fw-bold">{review.bookTitle}</span>}
            {!showBoth && showUser && !showBook && ((!myReview)? <h5>{review.userName}</h5> : <h5>Your Review:</h5>)}
          </div>
          {editable && <div style={{cursor: 'pointer', marginLeft: '10px', display: 'flex'}}>
                {!showBoth && showUser && !showBook && <h6 className="me-3" onClick={() => setEditing(true)}><i className="fa-solid fa-pen-to-square"></i></h6>}
                <h6 className="me-3" onClick={deleteThisReview} ><i className="fa-solid fa-trash"></i></h6>
                {/* <h6 className="me-3"><i className="fa-solid fa-trash-arrow-up"></i></h6> */}
          </div>}
        </div>
        <div className="fa-2x mb-3">
          <StarsComponent rating={review.rating} />
        </div>
        <p>{review.comment}</p>
      </div>
    </div>
  )
}

export default Review
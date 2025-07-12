import StarsComponent from "./StarsComponent"
import { deleteReview, deleteReviewAdmin, restoreReviewAdmin } from "../services/ReviewService"
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

const Review = ({ review, showUser = true, showBook = false, showBoth = false, myReview = false, editable = false, setEditing }) => {

  const handleReviewRestore = () => {
    restoreReviewAdmin(review.reviewId).then(() => {});
    window.location.reload();
  }
  const deleteThisReview = () => {
    if (sessionStorage.getItem("Admin") === "Yes") setShowAdminDeleteModal(true); 
    else setShowDeleteModal(true);
  }
  const handleReviewDelete = () => {
    deleteReview(review.reviewId).then(() => {});
    window.location.reload();
  }

  const [showAdminDeleteModal, setShowAdminDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reason, setReason] = useState(false);
  const [error, setError] = useState(false);
  
  const handleAdminClose = () => {
    setShowAdminDeleteModal(false);
    setError(false);
  }

  const handleAdminDelete = () => {
    if (reason) {
      review.reason = reason;
      deleteReviewAdmin(review).then((response) => {});
      window.location.reload();
    } else setError(true);
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
          {(editable || showBoth) && <div style={{cursor: 'pointer', marginLeft: '10px', display: 'flex'}}>
                {!showBoth &&  <h6 className="me-3" onClick={() => setEditing(true)}><i className="fa-solid fa-pen-to-square"></i></h6>}
                {!review.reason && <h6 className="me-3" onClick={deleteThisReview} ><i className="fa-solid fa-trash"></i></h6>}
                {review.reason && <h6 className="me-3" onClick={() => setShowRestoreModal(true)} ><i className="fa-solid fa-trash-arrow-up"></i></h6>}
          </div>}
        </div>
        <div className="fa-2x mb-3">
          <StarsComponent rating={review.rating} />
        </div>
        <p>{review.comment}</p>
        {review.reason && <p className=""><strong>Reason:</strong> {review.reason}</p>}
      </div>
    <Modal show={showAdminDeleteModal} onHide={handleAdminClose}>
        <Modal.Header closeButton><Modal.Title>Delete Review?</Modal.Title></Modal.Header>
        <Modal.Body>
          <form className="mt-1">
            <label className="form-label">Select a Reason to Delete this Review:</label>
            <select className={"form-select mt-2" + (error && " is-invalid")} onChange={(e) => setReason(e.target.value)}>
              <option value="">-- Reason --</option>
              <option value="Spam">Spam</option>
              <option value="Spoiler">Spoiler</option>
              <option value="Bad Language">Bad Language</option>
              <option value="Duplicate Review">Duplicate Review</option>
              <option value="Inappropriate Content">Inappropriate Content</option>
              <option value="False Information">False Information</option>
            </select>
            {error && <div className="invalid-feedback">You Must Select a Reason to Delete this Review.</div>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAdminClose}>No</Button>
          <Button variant="danger" onClick={handleAdminDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton><Modal.Title>Delete Review?</Modal.Title></Modal.Header>
        <Modal.Body>Are You Sure You Want To Delete Your Review?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button variant="danger" onClick={handleReviewDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRestoreModal} onHide={() => setShowRestoreModal(false)}>
        <Modal.Header closeButton><Modal.Title>Restore Review?</Modal.Title></Modal.Header>
        <Modal.Body>Are You Sure You Want To Restore This Review?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRestoreModal(false)}>No</Button>
          <Button variant="primary" onClick={handleReviewRestore}>Yes</Button>
        </Modal.Footer>
      </Modal>
      </div>
  )
}

export default Review
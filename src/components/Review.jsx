import React from 'react'

const Review = ({ review, showUser = true, showBook = false, showBoth = false, myReview = false }) => {
  return (
    <div className="card mb-3 shadow-sm w-100" style={{ maxWidth: '100%', borderRadius: '1rem' }}>
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
            {!showBoth && showUser && !showBook && ((!myReview)? <span className="text-muted">{review.userName}</span> : <h5>Your Review:</h5>)}
          </div>
          <span className="badge bg-primary ms-2" style={{ fontSize: '1.1rem' }}>{review.rating} ★</span>
        </div>
        <p className="card-text" style={{ fontSize: '1.05rem' }}>{review.comment}</p>
      </div>
    </div>
  )
}

export default Review
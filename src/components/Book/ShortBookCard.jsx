const ShortBookCard = ({book, setBookID}) => {
  return (
    <div onClick={() => setBookID(book.bookID)}>
        <div className="card bg-light">
            <div className="row m-3">
            <div className="text-center p-0">
                <img
                src={`data:image/jpeg;base64,${book.coverImage}`}
                className="w-50 img-fluid rounded"
                alt={book.title}
                />
            {/* </div>
            <div className="col-md-8"> */}
                <div className="card-body">
                <h6 className="card-title">{book.title}</h6>
                <p className="card-text">Author: {book.authorName}</p>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ShortBookCard
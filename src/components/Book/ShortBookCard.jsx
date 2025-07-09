const ShortBookCard = ({book, setBookID}) => {
  return (
    <div onClick={() => setBookID(book.bookID)}>
        <div className="card mb-3">
            <div className="row m-3">
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
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ShortBookCard
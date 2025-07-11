import ViewAllReviews from './ViewAllReviewsComponent'

const AdminComponent = () => {
return (
    <div>
        <div className="d-flex justify-content-end">
            <button className="btn btn-danger m-3" 
            onClick={() => {
                sessionStorage.removeItem("userId");
                sessionStorage.removeItem("Admin");
                window.location.reload();
            }}>
                Logout
            </button>
        </div>
        <ViewAllReviews />
    </div>
)
}

export default AdminComponent
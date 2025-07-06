import axios from "axios";

const API_BASE_URL = "http://localhost:8082/dbs/";
const USER_BASE_URL = "http://localhost:8086/dbs/";
const REVIEW_BASE_URL = API_BASE_URL + "review/";

export const getBooks = () => axios.get(API_BASE_URL + "books");
export const getUsers = () => axios.get(USER_BASE_URL + "user/users");

export const getReviews = () => axios.get(REVIEW_BASE_URL + "all");
export const getBookReviews = (bookID) => axios.get(REVIEW_BASE_URL + "book/" + bookID);
export const getAverageBookRating = (bookID) => axios.get(REVIEW_BASE_URL + "book/average/" + bookID);
export const getUserReviews = (userId) => axios.get(REVIEW_BASE_URL + "user/" + userId);

export const addReview = (review) => axios.post(REVIEW_BASE_URL + "add", review);
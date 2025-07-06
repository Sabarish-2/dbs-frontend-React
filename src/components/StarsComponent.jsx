const StarsComponent = ({ rating, handleRatingClick }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <>
      {stars.map((i) => (
        <i
          style={{ color: "orange" }}
          key={i}
          onClick={(e) => handleRatingClick(e, i)}
          className={
            rating >= i
              ? "fa-solid fa-star"
              : rating <= i && rating > i - 1
              ? "fa-regular fa-star-half-stroke"
              : "fa-regular fa-star"
          }
        ></i>
      ))}
    </>
  );
};

export default StarsComponent;

import React from "react";

const ReviewCard = React.forwardRef(({ name, review }, ref) => {
  return (
    <div ref={ref} className="reviews__card">
      <p className="reviews__card-name">{name}</p>

      <div className="reviews__card-comment">{review}</div>
    </div>
  );
});

export default ReviewCard;

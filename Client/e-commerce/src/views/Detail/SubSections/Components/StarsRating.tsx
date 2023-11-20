
interface props {
  review: number;
}

function StarsRating({ review }: props) {
  const starElements = Array.from({ length: review }, (_, index) => (
    <i key={index} className="bi bi-star-fill text-warning fs-6 me-1"></i>
  ));

  const hasHalfStar = review % 1 !== 0;

  const halfStarElement = hasHalfStar ? (
    <i key="half" className="bi bi-star-half text-warning fs-6 me-1"></i>
  ) : null;

  const emptyStarElements = Array.from({ length: 5 - review }, (_, index) => (
    <i key={index} className="bi bi-star text-warning fs-6 me-1"></i>
  ));
  return (
    <div className="me-sm-2">
      {starElements}
      {halfStarElement}
      {emptyStarElements}
    </div>
  )
}

export default StarsRating
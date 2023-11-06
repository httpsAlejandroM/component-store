
interface props {
  review: number;
}


function StarsRating({review}:props) {
    const starElements = Array.from({ length: review }, (_, index) => (
        <span key={index} className="bi bi-star-fill text-warning fs-6 me-1"></span>
      ));
    
      const emptyStarElements = Array.from({ length: 5 - review }, (_, index) => (
        <span key={index} className="bi bi-star text-warning fs-6 me-1"></span>
      ));
  return (
    <div className="me-4">
    {starElements}
    {emptyStarElements}
  </div>
  )
}

export default StarsRating
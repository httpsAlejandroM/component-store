import SortReviews from "./Components/SortReviews"
import StarsRating from "./Components/StarsRating"

function ReviewsSection() {

    interface userReview {
        user: string,
        date: string,
        stars: number,
        review: string
    }

    const reviews: userReview[] = [
        {
            user: "Ragnar Lothbrok",
            date: "5/11/2023",
            stars: 4,
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum accusamus consequuntur rerum, voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum accusamus consequuntur rerum,"
        },
        {
            user: "Ragnar Lothbrok",
            date: "5/11/2023",
            stars: 4,
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum accusamus consequuntur rerum, voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum accusamus consequuntur rerum,"
        },
        {
            user: "Ragnar Lothbrok",
            date: "5/11/2023",
            stars: 4,
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum accusamus consequuntur rerum, voluptates Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum accusamus consequuntur rerum,"
        },
    ]

    return (
        <section className="container">
            <div className="d-flex flex-column">
                <h3 className="text-success-alpha p-1 fs-2 mt-2 mb-3">Opiniones del producto</h3>
                
                <div className="d-flex flex-row justify-content-between">
                <div className="col-5 d-flex flex-row fs-5 text-warning align-items-center my-3">
                <p className="me-3 mb-0 text-dark p-0">4.5</p>
                    <StarsRating review={4}></StarsRating>
                    <span className="text-dark fs-6">(1)</span>
                </div>
                   <div className="col-lg-3 col-xl-2">
                   <SortReviews/>
                   </div>
                </div>
            </div>
            {
                reviews.map((review: userReview, index: number) => {
                    return (
                        <div key={index} className="d-flex flex-column p-3 my-0">
                            <div className="d-flex flex-row justify-content-between">
                                <div className="d-flex flex-row">
                                    <span className="text-success-alpha">{review.user} <span className="fw-normal text-dark">{review.date}</span></span>
                                </div>
                                <StarsRating review={review.stars} ></StarsRating>
                            </div>
                            <div className="d-flex py-1 fs-6">
                                <p className="mt-1">{review.review}
                                </p>
                            </div>
                            <hr className="border-dark border-1 my-0"/>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default ReviewsSection
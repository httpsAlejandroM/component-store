import bannerOne from "../../assets/banner-1.jpg"
import bannerTwo from "../../assets/banner-2.jpg"
import bannerThree from "../../assets/banner-3.jpg"
import bannerFour from "../../assets/banner-4.jpg"



function Carousel() {
  return (
    <article className="d-flex justify-content-center col-12">

    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-theme="light" data-bs-ride="carousel" >
  <div className="carousel-inner " >
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
    <div className="carousel-item" data-bs-interval="5500">
      <img src={bannerOne} className="d-block w-100" alt="Banner 1" />
    </div>
    <div className="carousel-item" data-bs-interval="5500">
      <img src={bannerTwo} className="d-block w-100" alt="Banner 2"/>
    </div>
    <div className="carousel-item" data-bs-interval="5500">
      <img src={bannerThree} className="d-block w-100" alt="Banner 3"/>
    </div>
    <div className="carousel-item active" data-bs-interval="5500">
      <img src={bannerFour} className="d-block w-100" alt="Banner 4"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
  
</div>
</article>

  )
}

export default Carousel
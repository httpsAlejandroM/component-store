import Carousel from "./Carousel"
import BrandsCarousel from "./BrandsCarousel"
import HomeCardsSection from "./HomeCardsSection"

function Home() {
  return (
    <section className="min-vh-100 sbg-color d-flex flex-column align-items-center container justify-content-between">
      <Carousel></Carousel>
      <HomeCardsSection></HomeCardsSection>
      <BrandsCarousel></BrandsCarousel>
    </section>
  )
}

export default Home
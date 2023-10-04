import Carousel from "./Carousel"
import BrandsCarousel from "./BrandsCarousel"
import HomeCardsSection from "./HomeCardsSection"
import MosaicSection from "./MosaicSection"

function Home() {
  return (
    <section className="container-flud min-vh-100 sbg-color d-flex flex-column align-items-center  justify-content-between">
      <Carousel></Carousel>
      <MosaicSection></MosaicSection>
      <HomeCardsSection></HomeCardsSection>
      <BrandsCarousel></BrandsCarousel>
    </section>
  )
}

export default Home
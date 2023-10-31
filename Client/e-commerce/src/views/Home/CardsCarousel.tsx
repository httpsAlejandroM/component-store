import CardsContainer from "../../components/Cards/CardsContainer"
import { ComponentInterface } from "../../interfaces"
import { useState, useEffect } from "react"

interface props {
  sectionCards: string
  arr: ComponentInterface[]
}

function CardsCarousel({ arr, sectionCards }: props) {

  const [cardsPerSlide, setCardsPerSlide] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(arr.length / cardsPerSlide);

  const slides = [];
  //"Paginado" del carousel
  for (let i = 0; i < totalSlides; i++) {
    const startIndex = i * cardsPerSlide;
    const endIndex = startIndex + cardsPerSlide;
    const slideData = arr.slice(startIndex, endIndex);
    slides.push(slideData);
  }

  const handleResize = () => {
    // Ajusto el número de cartas por slide según el ancho de la pantalla
    if (window.innerWidth >= 1750) {
      setCardsPerSlide(5);
    } else if (window.innerWidth >= 1200) {
      setCardsPerSlide(4);
    } else if (window.innerWidth >= 992) {
      setCardsPerSlide(3);
    }
    else if (window.innerWidth >= 771) {
      setCardsPerSlide(2);
    } else {
      setCardsPerSlide(1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);       
  }, [currentIndex]);

  return (
    <article id={sectionCards} className="carousel slide home ">
      <div className="carousel-inner ">
        <div className="carousel-item active ">
          <CardsContainer data={slides[0]}></CardsContainer>
        </div>
        {
          slides.slice(1, 20).map((slideData, index) => (
            <div
              key={index}
              className={`carousel-item`}
            >
              <CardsContainer data={slideData}></CardsContainer>
            </div>
          ))
        }

      </div>
      <button className="carousel-control-prev" onClick={handlePrev} type="button" data-bs-target={`#${sectionCards}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" onClick={handleNext} type="button" data-bs-target={`#${sectionCards}`} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </article>
  )
}

export default CardsCarousel
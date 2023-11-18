import { useState, useRef } from "react"
import { ComponentInterface } from "../../../interfaces"
import mosaico from "../../../../src/assets/mosaico.jpg"
import { useEffect } from "react";
import BuyContainer from "./Components/BuyContainer";
import CarouselDetail from "../../../components/CarouselDetail";
import ImgDetail from "./Components/ImgDetail";
import TopResponsiveDetail from "./Components/TopResponsiveDetail";

interface props {
    data: ComponentInterface
}

function BuySection({ data }: props) {

    const images = [data.image, mosaico]
    const [selectedImage, setSelectedImage] = useState(images[0])

    const lens = useRef<HTMLDivElement>(null)
    const productImg = useRef<HTMLImageElement>(null)
    const magnifiedImg = useRef<HTMLDivElement>(null)

    const magnify = (event: any) => {
        moveLens(event)
    }

    const moveLens = (event: any) => {
        let x, y, cx, cy, max_xpos, max_ypos;
        const productImgRect = productImg.current?.getBoundingClientRect()

        if (productImgRect && lens.current) {
            x = event.pageX - productImgRect.left - lens.current.offsetWidth / 3.2;
            y = event.pageY - productImgRect.top - lens.current.offsetHeight / 3.7
            max_xpos = productImgRect.width - lens.current.offsetWidth
            max_ypos = productImgRect.height - lens.current.offsetHeight

            if (x > max_xpos) x = max_xpos;
            if (x < 0) x = 0;
            if (y > max_ypos) x = max_ypos;
            if (y < 0) y = 0;
        }

        if (magnifiedImg.current && lens.current && x && y && productImgRect) {
            cx = magnifiedImg.current?.offsetWidth / lens.current?.offsetWidth
            cy = magnifiedImg.current?.offsetHeight / lens.current?.offsetHeight

            magnifiedImg.current.style.backgroundImage = `url(${selectedImage})`;
            magnifiedImg.current.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
            magnifiedImg.current.style.backgroundSize = `${productImgRect.width * cx}px ${productImgRect?.height * cy+150}px`
            magnifiedImg.current.style.backgroundRepeat = "no-repeat"
        }

        if (lens.current) {
            lens.current.style.cssText = `top: ${y}px; left:${x}px`
            lens.current.classList.add("active")
            magnifiedImg.current?.classList.add("active")
        }
    }

    const leaveLens = () => {
      lens.current &&  lens.current.classList.remove("active")
      magnifiedImg.current?.classList.remove("active")
    }

    useEffect(() => {
        setSelectedImage(images[0])
    }, [data])

    return (
        <section className="container row mt-2" style={{ minHeight: "85vh" }}>
            <div className="d-none d-lg-flex flex-column bg-light col-lg-1 rounded-top-4 p-1">
                {images.map((image: string) => (
                    <img
                        key={image}
                        className={`img-thumbnail border-2 ${selectedImage === image ? 'border-success-alpha' : ''} mt-2 `}
                        src={image}
                        alt={`Thumbnail ${data.title}`}
                        onClick={() => setSelectedImage(image)}
                    />
                ))}
            </div>
            <ImgDetail selectedImage={selectedImage} data={data} lensRef={lens} productImgRef={productImg} magnify={magnify} leaveLens={leaveLens}/>
            <TopResponsiveDetail data={data} />
            <CarouselDetail arrayImages={images} autoPlay={false} />
            <BuyContainer data={data} selectedImage={selectedImage} magnifiedImgRef={magnifiedImg} />
            <hr className="border-dark border-1  col-12 p-0" />
        </section>
    )
}

export default BuySection
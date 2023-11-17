import { useState } from "react"
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

    useEffect(() => {
        setSelectedImage(images[0])
    }, [data])


    return (
        <section className="container row mt-4" style={{ minHeight: "85vh" }}>
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
            <ImgDetail selectedImage={selectedImage} data={data}/>
            <TopResponsiveDetail data={data}/>
            <CarouselDetail arrayImages={images} autoPlay={false} />
            <BuyContainer data={data} selectedImage={selectedImage}/>
            <hr className="border-dark border-1  col-12 p-0" />
        </section>
    )
}

export default BuySection
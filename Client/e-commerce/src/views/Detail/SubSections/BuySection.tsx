import { useState } from "react"
import { ComponentInterface } from "../../../interfaces"
import mosaico from "../../../../src/assets/mosaico.jpg"
import { useEffect } from "react";
import BuyContainer from "./Components/BuyContainer";

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
            <div className="bg-light col-1 rounded-top-4 p-1">
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
            <div className="bg-light col-7 p-4 position-relative  d-flex align-items-start justify-content-center">
                <img className="img-fluid sticky-top z-1 p-4" style={{ maxHeight: "80vh" }} src={selectedImage} alt={data.title} />
            </div>
            <BuyContainer data={data}/>
            <hr className="border-dark border-1  col-12 p-0" />
        </section>
    )
}

export default BuySection
import { useState } from "react"
import { ComponentInterface } from "../../../interfaces"
import mosaico from "../../../../src/assets/mosaico.jpg"

interface props {
    data: ComponentInterface
}

function BuySection({ data }: props) {

    const images = [data.image, mosaico]
    const [selectedImage, setSelectedImage ] = useState(images[0])


    return (
        <section className="min-vh-100 row">
            <div className="bg-light col-1">
            {images.map((image:string) => (
                    <img
                        key={image}
                        className={`img-thumbnail ${selectedImage === image ? 'border-primary' : ''} mt-2 `}
                        src={image}
                        alt={`Thumbnail ${data.title}`}
                        onClick={() => setSelectedImage(image)}
                    />
                ))}
            </div>
            <div className="bg-light col-7 p-0 position-relative  img-container ">
                <img className="img-fluid sticky-top z-1 p-4"  src={selectedImage} alt={data.title} />
            </div>
            <div className="bg-light col-4 d-flex flex-column border border-dark-subtle text-wrap ">
                <div className="d-flex justify-content-end pt-2"><button className="btn"><i className="bi bi-heart fs-2"></i></button></div>
                <h2 className="text-dark display-6 text-wrap text-truncate">{data.title}</h2>
                <div className="d-flex flex-row fs-4 text-warning align-items-center">
                    <p className="me-3 mb-0 text-dark p-0">4.5</p>
                    <span className="bi bi-star-fill"></span>
                    <span className="bi bi-star-fill"></span>
                    <span className="bi bi-star-fill"></span>
                    <span className="bi bi-star-fill"></span>
                    <span className="bi bi-star-half"></span>
                    <span className="text-dark ms-2 fs-6">(1)</span>
                </div>
                <p className="fs-2">{data.price}</p>
                <div className="d-flex align-items-center">
                    <div className="d-flex flex-row align-items-center gap-2">
                        <button className="btn btn-sm "><i className="bi bi-dash-square fs-4 text-dark"></i></button>
                        <span className="fs-3">1</span>
                        <button className="btn btn-sm "><i className="bi bi-plus-square fs-4 text-dark"></i></button>
                    </div>
                    <div className="d-inline-flex"><span>{`(${data.stock} disponibles)`}</span></div>
                </div>
                <div className="d-flex flex-column gap-1 align-items-center">
                    <button className="btn btn-primary col-6">Comprar ahora</button>
                    <button className="btn btn-primary col-6">Agregar al carrito</button>
                </div>

            </div>
        </section>
    )
}

export default BuySection
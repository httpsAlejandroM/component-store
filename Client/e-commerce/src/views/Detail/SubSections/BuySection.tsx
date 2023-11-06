import { useState } from "react"
import { ComponentInterface } from "../../../interfaces"
import mosaico from "../../../../src/assets/mosaico.jpg"
import { useEffect } from "react";

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
        <section className="row mt-4" style={{ minHeight: "85vh" }}>
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
            <div className="bg-light col-4 p-4 d-flex flex-column border border-dark-subtle text-wrap rounded-top-4 rounded-bottom-0 border-bottom-0">
                <div className="d-flex justify-content-end"><button className="btn btn-sm"><i className="bi bi-heart fs-2 text-success-alpha"></i></button></div>
                <h2 className="text-dark display-6 text-wrap text-truncate">{data.title}</h2>
                <div className="d-flex flex-row fs-5 text-warning align-items-center mt-2">
                    <p className="me-3 mb-0 text-dark p-0">4.5</p>
                    <span className="bi bi-star-fill"></span>
                    <span className="bi bi-star-fill"></span>
                    <span className="bi bi-star-fill"></span>
                    <span className="bi bi-star-fill"></span>
                    <span className="bi bi-star-half"></span>
                    <span className="text-dark ms-2 fs-6">(1)</span>
                </div>
                <div className="mt-2"><p className="fs-1 m-0 p-0">{`$${data.price}`}</p></div>
                <div className="d-flex align-items-center mt-2 ">
                    <div className="d-flex flex-row align-items-center  gap-3">
                        <button className="btn btn-sm p-1"><i className="bi bi-dash-square-fill fs-3"></i></button>
                        <span className="fs-3">1</span>
                        <button className="btn btn-sm p-1 "><i className="bi bi-plus-square-fill  fs-3 "></i></button>
                    </div>

                    <div className="d-inline-flex ms-3"><span>{`(${data.stock} disponibles)`}</span></div>
                </div>
                <div className="d-flex flex-column gap-2 align-items-center my-4">
                    <button className="btn btn-buy py-2 col-8 fw-bolder">Comprar ahora</button>
                    <button className="btn btn-add-cart py-2 col-8 fw-bolder text-success-alpha">Agregar al carrito</button>
                </div>
                <div className="d-flex flex-column mt-3 gap-3 ">
                    <div className="d-flex flex-row gap-2 ">
                        <div><i className="bi bi-arrow-return-left fs-5"></i></div>
                        <div className="d-flex flex-column"><span className="text-success-alpha p-0 fw-bolder" >Devolución gratis</span><span className="text-dark p-0 fw-normal">Tenés 30 días desde que lo recibís.</span></div>
                    </div>
                    <div className="d-flex flex-row gap-2 ">
                        <div><i className="bi bi-shield-check fs-5"></i></div>
                        <div className="d-flex flex-column"><span className="text-success-alpha p-0 fw-bolder" >Compra Protegida, <span className="text-dark p-0 fw-normal">recibí el producto que esperabas o te devolvemos tu dinero.</span></span></div>
                    </div>
                    <div className="d-flex flex-row gap-2 ">
                        <div><i className="bi bi-trophy fs-5"></i></div>
                        <div className="d-flex flex-row align-items-center"><span className="text-dark p-0">12 meses de garantía de fábrica.</span></div>
                    </div>
                </div>

            </div>
            <hr className="border-dark border-1  my-0 " />
        </section>
    )
}

export default BuySection
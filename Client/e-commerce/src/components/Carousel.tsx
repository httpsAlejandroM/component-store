interface props {
    arrayImages: string[],
    autoPlay: boolean
}

function Carousel({ arrayImages, autoPlay }: props) {
    return (
        <article className="d-flex justify-content-center align-items-center d-lg-none" >
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-theme="light" data-bs-ride={autoPlay ? "carousel" : "false"} >
                <div className="carousel-inner" >
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        {arrayImages.slice(1).map((imagen, index) => (
                            <button
                                key={imagen}
                                type="button"
                                data-bs-target="#carouselExampleAutoplaying"
                                data-bs-slide-to={index + 1}
                                aria-label={`Slide ${index + 2}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-item active " style={{maxHeight:"60vh", minHeight:"60vh"}} data-bs-interval="5500">
                        <img src={arrayImages[0]}  className="d-block img-fluid" alt="Imagen del producto 1" />
                    </div>
                    {
                        arrayImages.slice(1).map((image: string, index: number) => {
                            return (
                                <div
                                    key={image}
                                    className="carousel-item " style={{maxHeight:"60vh", minHeight:"60vh"}} data-bs-interval="5500">
                                    <img src={image}  className="d-block img-fluid" alt={`Imagen del producto ${index + 2}`} />
                                </div>
                            )
                        })
                    }
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
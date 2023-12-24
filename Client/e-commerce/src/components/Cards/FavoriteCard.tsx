interface props {
    name: string
    image: string
    price: number
    containerStyle: string
}

function FavoriteCard({image, name, price, containerStyle}:props) {
    return (
        <div className={`${containerStyle}`}>

            <div className="col-2 d-flex align-items-center justify-content-center">
            <img className="img-fluid col-12 align-self-center" src={image} alt={name} />
            </div>

           <div className="col align-self-center">
            <h3 className="fs-6">{name}</h3>
            <span className="fs-3">{`$${price}`}</span>
           </div>

           <div className="col-3 d-flex flex-column gap-3 align-self-center">
            <button className="btn btn-buy col-9">
            Agregar al Carrito
            </button>
            <button className="btn btn-outline-danger col-9">
                Eliminar
            </button>
           </div>
        </div>
    )
}
export default FavoriteCard
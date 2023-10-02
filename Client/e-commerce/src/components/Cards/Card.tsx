
interface Card {
  stock: number
  title: string
  price: number
  image: string
}

function Card({ stock, title, price, image }: Card) {
  return (

    <div className="card shadow-lg m-2 col-2" style={{ width: "15rem", height: "25rem" }}>
      <a href="#" className="text-decoration-none h-100">
        <div className="row align-items-center justify-content-center" style={{ height: "15rem" }}>
          <img src={image} className="card-img-top " style={{ maxHeight: "15rem", maxWidth: "11rem" }} alt="" />
        </div>

        <hr className="border-dark m-0" />

        <div className="card-body text-dark text-center p-2 position-relative" style={{ height: "10rem" }}>
          <div className="mt-1">
            <small className={`card-text rounded-1 fw-bold text-white px-1 ${stock ? "bg-success" : "bg-danger"}`}>{stock ? "En stock" : "Sin stock"}</small>
          </div>
          <div className="mt-3">
            <h5 className="card-title fs-6 text-start">{title}</h5>
          </div>
          <div className="position-absolute bottom-0 mb-3">
            
            <p className="card-text text-start ">${price}</p>
          

          </div>
        </div>

      </a>

    </div>
  )
}

export default Card
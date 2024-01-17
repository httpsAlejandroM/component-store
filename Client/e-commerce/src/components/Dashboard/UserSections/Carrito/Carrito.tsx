import AccountSummary from "./AccountSummary"
import CardsCartContainer from "./CardsCartContainer"

function Carrito() {

  const cartItems = [
    {
      _id: "64eaa4b096581d6cffcb1ae9",
      title: "ASUS Prime Z390-A Motherboard",
      image: "https://res.cloudinary.com/dezvujzed/image/upload/v1683230391/ecommerce/drzvjayerw4j9h3adtke.jpg",
      price: 189.99,
      quantity: 1,
      stock: 0
    },
    {
      _id: "64eaa4b096581d6cffcb1b52",
      title: "Nintendo Switch",
      image: "https://res.cloudinary.com/dezvujzed/image/upload/v1683241444/ecommerce/71qccaRKQVL_prsnpy.jpg",
      price: 399.99,
      quantity: 3,
      stock: 0
    }
  ] 

  return (
    <section className="container mb-5 mt-4">
      <h2 className="col fs-3 mb-4 text-white text-start">Carrito</h2>
      <div className="row justify-content-between">
      <CardsCartContainer components={cartItems}/>
      <AccountSummary components={cartItems}/>
      </div>
    </section>
  )
}
export default Carrito
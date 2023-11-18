import { ComponentInterface } from "../../../../interfaces"
import AddCart from "./AddCart"
import Benefits from "./Benefits"
import BuyButton from "./BuyButton"
import FavButton from "./FavButton"
import QuantityProduct from "./QuantityProduct"
import StarsRating from "./StarsRating"

interface props {
    data: ComponentInterface
    selectedImage: string
    magnifiedImgRef: any
}

function BuyContainer({ data, selectedImage, magnifiedImgRef }: props) {
    return (
        <div className="bg-light col-lg-4 p-4 d-flex flex-column  position-relative border border-dark-subtle text-wrap rounded-top-4 rounded-bottom-0 border-bottom-0">
            <div ref={magnifiedImgRef} className={`magnified-img d-none d-lg-flex bg-light position-absolute top-0 start-0 p-2 rounded-4 `}>
            </div>
            <FavButton styles="d-none d-lg-flex justify-content-end"></FavButton>
            <h2 className="d-none d-lg-flex text-dark display-6 text-wrap text-truncate">{data.title}</h2>
            <div className="d-none d-lg-flex flex-row fs-5 text-warning align-items-center mt-2">
                <span className="me-3 mb-0 text-dark p-0">4.5</span>
                <StarsRating review={4}></StarsRating>
                <span className="text-dark fs-6">(1)</span>
            </div>
            <div className="mt-2 "><p className="m-0 p-0 display-4">{`$${data.price}`}</p></div>
            <QuantityProduct data={data} styles="d-flex justify-content- justify-content-lg-start  align-items-center mt-2 "></QuantityProduct>
            <div className="d-flex flex-column gap-2 align-items-center my-4">
                <BuyButton />
                <AddCart />
            </div>
            <Benefits />

        </div>
    )
}

export default BuyContainer
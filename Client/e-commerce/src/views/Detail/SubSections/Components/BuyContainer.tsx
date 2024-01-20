import { useState } from "react"
import { ComponentInterface } from "../../../../interfaces"
import { useAppSelector } from "../../../../redux/hooks"
import AddCart from "./AddCart"
import Benefits from "./Benefits"
import BuyButton from "./BuyButton"
import FavButton from "./FavButton"
import QuantityProduct from "./QuantityProduct"
import StarsRating from "./StarsRating"
import { cartComponentProps } from "../../../../utilities/cartProps"

interface props {
    data: ComponentInterface
    selectedImage: string
    magnifiedImgRef: any
}

function BuyContainer({ data, magnifiedImgRef }: props) {

    const userInfo = useAppSelector((state)=>state.userReducer)
    const [ isFav, setIsFav ] = useState(userInfo.userInfo?.favorites?.some((product)=> product._id == data._id))
    const [quantityProduct, setQuantityProduct] = useState(1)

    return (
        <div className="bg-light col-lg-4 p-4 d-flex flex-column  position-relative border border-dark-subtle text-wrap rounded-top-4 rounded-bottom-0 border-bottom-0">
            <div ref={magnifiedImgRef} className={`magnified-img bg-light position-absolute top-0 start-0  rounded-4 `}>
            </div>
            <FavButton setIsFav={setIsFav} componentFav={data} userId={userInfo.userInfo.id} isFav={isFav} styles="d-none d-lg-flex justify-content-end"></FavButton>
            <h2 className="d-none d-lg-flex text-dark display-6 text-wrap text-truncate">{data.title}</h2>
            <div className="d-none d-lg-flex flex-row fs-5 text-warning align-items-center mt-2">
                <span className="me-3 mb-0 text-dark p-0">{4.5}</span>
                <StarsRating review={4.5}></StarsRating>
                <span className="text-dark fs-6">(1)</span>
            </div>
            <div className="mt-2 "><p className="m-0 p-0 display-4">{`$${data.price}`}</p></div>
            <QuantityProduct quantityProduct={quantityProduct} setQuantityProduct={setQuantityProduct} children={<div className="d-inline-flex ms-3"><span>{`(${data.stock} disponibles)`}</span></div>} stock={data.stock} styles="d-flex justify-content- justify-content-lg-start  align-items-center mt-2 "></QuantityProduct>
            <div className="d-flex flex-column gap-2 align-items-center my-4">
                <BuyButton />
                <AddCart component={cartComponentProps(data, quantityProduct) }/>
            </div>
            <Benefits />

        </div>
    )
}

export default BuyContainer
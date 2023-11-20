import { ComponentInterface } from "../../../../interfaces"
import { useState } from "react"

interface props {
    data: ComponentInterface
    styles: string
}

function QuantityProduct({ styles, data }: props) {

    const [quantityProduct, setQuantityProduct] = useState(1)

    const removeQuantity = () => {
        if (quantityProduct > 1) {
            setQuantityProduct(quantityProduct - 1)
        }
    }

    const addQuantity = () => {
        if (quantityProduct < data.stock) {
            setQuantityProduct(quantityProduct + 1)
        }
    }

    return (
        <div className={styles}>
            <div className="d-flex flex-row align-items-center  gap-3">
                <button onClick={() => removeQuantity()} className="btn btn-sm p-1"><i className="bi bi-dash-square-fill fs-3"></i></button>
                <span className="fs-3">{quantityProduct}</span>
                <button onClick={() => addQuantity()} className="btn btn-sm p-1 "><i className="bi bi-plus-square-fill  fs-3 "></i></button>
            </div>

            <div className="d-inline-flex ms-3"><span>{`(${data.stock} disponibles)`}</span></div>
        </div>
    )
}

export default QuantityProduct
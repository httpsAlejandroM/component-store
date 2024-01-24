import { ReactNode } from "react"

interface props {
    stock: number
    styles: string
    children?: ReactNode,
    quantityProduct: number
    setQuantityProduct: Function
}

function QuantityProduct({ styles, stock, children, quantityProduct, setQuantityProduct }: props) {

    const removeQuantity = () => {
        if (quantityProduct > 1) {
            setQuantityProduct(quantityProduct - 1)
        }
    }

    const addQuantity = () => {
        if (quantityProduct < stock) {
            setQuantityProduct(quantityProduct + 1)
        }
    }

    return (
        <div className={styles}>
            <div className="d-flex flex-row align-items-center justify-content-center  gap-3">
                <button onClick={() => removeQuantity()} className="btn btn-sm p-1"><i className="bi bi-dash-square-fill fs-3"></i></button>
                <span  className="fs-3">{quantityProduct}</span>
                <button onClick={() => addQuantity()} className="btn btn-sm p-1 "><i className="bi bi-plus-square-fill  fs-3 "></i></button>
            </div>
            {children}
        </div>
    )
}

export default QuantityProduct
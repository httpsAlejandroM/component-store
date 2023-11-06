import { ComponentInterface } from "../../../../interfaces"

interface props {
    data: ComponentInterface
    styles: string
}

function QuantityProduct({ styles, data }: props) {
    return (
        <div className={styles}>
            <div className="d-flex flex-row align-items-center  gap-3">
                <button className="btn btn-sm p-1"><i className="bi bi-dash-square-fill fs-3"></i></button>
                <span className="fs-3">1</span>
                <button className="btn btn-sm p-1 "><i className="bi bi-plus-square-fill  fs-3 "></i></button>
            </div>

            <div className="d-inline-flex ms-3"><span>{`(${data.stock} disponibles)`}</span></div>
        </div>
    )
}

export default QuantityProduct
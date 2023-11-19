import { ComponentInterface } from '../../../../interfaces'

interface props {
    selectedImage: string,
    data: ComponentInterface
    lensRef: any
    productImgRef: any
    magnify: Function
    leaveLens: Function
}

function ImgDetail({ selectedImage, data, lensRef, productImgRef, magnify, leaveLens }: props) {

    return (
        < >
            <div className="lens-container d-none d-lg-flex bg-dark col-lg-7 p-4 position-relative ">
                <img onMouseMove={(e)=>magnify(e)} ref={productImgRef} className="img-fluid sticky-top z-1 p-4" style={{ maxHeight: "80vh" }} src={selectedImage} alt={data.title} />
                <div ref={lensRef} onMouseOut={(e)=>leaveLens(e)} onMouseMove={(e)=>magnify(e)} className='magnifier-lens z-2'></div>
            </div>
        </>
    )
}

export default ImgDetail
import { ComponentInterface } from '../../../../interfaces'

interface props {
    selectedImage: string,
    data: ComponentInterface
}

function ImgDetail({ selectedImage, data }: props) {

    return (
        < >
            <div className="d-none d-lg-flex bg-light col-lg-7 p-4 position-relative align-items-start justify-content-center">
                <img className="img-fluid sticky-top z-1 p-4" style={{ maxHeight: "80vh" }} src={selectedImage} alt={data.title} />
            </div>
        </>
    )
}

export default ImgDetail
import { ComponentInterface } from "../../../../interfaces"
import { useAppSelector } from "../../../../redux/hooks"
import FavButton from "./FavButton"
import StarsRating from "./StarsRating"

interface props {
    data: ComponentInterface
}

function TopResponsiveDetail({ data }: props) {

    const userInfo = useAppSelector((state) => state.userReducer)
    const isFav = userInfo.userInfo?.favorites?.some((product) => product._id == data._id)

    return (
        <div className="d-flex flex-column d-lg-none">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex flex-row fs-5 text-warning align-items-center mt-2">
                    <span className="me-3 mb-0 text-dark p-0">4.5</span>
                    <StarsRating review={4}></StarsRating>
                    <span className="text-dark fs-6">(1)</span>
                </div>
                <FavButton componentFav={data} isFav={isFav} styles="d-flex justify-content-end"></FavButton>
            </div>
            <h2 className="d-flex text-dark display-5 text-wrap text-truncate mb-0">{data.title}</h2>
        </div>
    )
}

export default TopResponsiveDetail
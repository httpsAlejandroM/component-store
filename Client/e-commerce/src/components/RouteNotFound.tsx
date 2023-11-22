import { Link } from "react-router-dom"

function RouteNotFound() {
    return (
        <div className="vh-100 text-white m-auto container-fluid d-flex flex-column align-items-center justify-content-center">
            <h3 className="display-1">Not Found</h3>
            <Link to="/"><button className="btn btn-outline-success p-2 px-5 mt-4">Volver</button></Link>
        </div>
    )
}
export default RouteNotFound
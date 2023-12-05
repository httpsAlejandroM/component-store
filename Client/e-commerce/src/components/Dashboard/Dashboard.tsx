import { useAppSelector } from "../../redux/hooks"

function Dashboard() {

    const userInfo = useAppSelector((state)=>state.userReducer)
  
    return (
        <section className="min-vh-100 d-flex flex-column gap-3 align-items-center justify-content-center content">
            {
                userInfo && <div className="card  " style={{ width: "18rem" }}>
                    <img src={userInfo.userInfo.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{userInfo.userInfo.userName}</h5>
                        <p className="card-text">{userInfo.userInfo.email}</p>
                    </div>
                </div>
            }
            <button  className="btn btn-primary">Show user</button>
        </section>
    )
}
export default Dashboard
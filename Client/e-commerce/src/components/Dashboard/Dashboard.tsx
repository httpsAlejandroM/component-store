import { useEffect } from "react"
import { useAppSelector } from "../../redux/hooks"

function Dashboard() {

    const dataUser = useAppSelector((state)=>state.userReducer)

useEffect(()=>{
    console.log(dataUser);
    
},[dataUser])    
    return (
        <section className="min-vh-100 d-flex flex-column gap-3 align-items-center justify-content-center content">
            {
                dataUser && <div className="card  " style={{ width: "18rem" }}>
                    <img src={dataUser.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{dataUser.userName}</h5>
                        <p className="card-text">{dataUser.email}</p>
                    </div>
                </div>
            }
            <button  className="btn btn-primary">Show user</button>
        </section>
    )
}
export default Dashboard
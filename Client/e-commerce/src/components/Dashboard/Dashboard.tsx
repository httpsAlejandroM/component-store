import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Dashboard() {

    return (
        <main className="min-vh-100 d-flex flex-row content">
          <Sidebar /> 
           <Outlet/>
        </main>
    )
}
export default Dashboard
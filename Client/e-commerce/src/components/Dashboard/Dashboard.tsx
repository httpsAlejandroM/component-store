import { useState } from "react";
import Content, { userDashboardSections } from "./Content";
import Sidebar from "./Sidebar";

function Dashboard() {

    const [selectedContent, setSelectedContent] = useState<userDashboardSections>("Compras")
    
    return (
        <main className="min-vh-100 d-flex flex-row">
           <Sidebar setSelectedItem={setSelectedContent}/>
           <Content selectedContent={selectedContent}/>
        </main>
    )
}
export default Dashboard
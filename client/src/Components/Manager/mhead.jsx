import { Link } from "react-router-dom"

function ManagerHead(){
    return(
        <>
        <body>

<header>
    <div className="container">
        <div id="logo">Restaurant Management</div>
    </div>
</header>

<nav class="vertical-nav">
    <ul class="nav-links" style={{marginTop:"40px"}}>
        <li><Link to={"/managerHome"} style={{fontSize:"20px"}}>Manager Home</Link></li>
        <li><Link to={"/managerViewFood"} style={{fontSize:"20px"}}>View Food</Link></li>
        <li><Link to={"/orders"} style={{fontSize:"20px"}}>Food Orders</Link></li>
        <li><Link to={"/history"} style={{fontSize:"20px"}}>Orders History</Link></li>
        <li><Link to={"/restaurantTables"} style={{fontSize:"20px"}}>Restaurant Tables</Link></li>
        <li><Link to={"/reservations"} style={{fontSize:"20px"}}>Table Reservations</Link></li>
        <li><Link to={"/logout"} style={{fontSize:"20px"}}>Logout</Link></li>
    </ul>
</nav>



</body> 
        </>
    )
}
export default ManagerHead
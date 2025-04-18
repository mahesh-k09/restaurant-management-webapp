import { Link } from "react-router-dom"

function CustomerHead(){
    return(
        <>
        <body>

<header>
    <div class="container">
        <div id="logo">Restaurant Management</div>
    </div>
</header>

<nav class="vertical-nav">
    <ul class="nav-links" style={{marginTop:"40px"}}>
        <li><Link to={"/customerHome"} style={{fontSize:"20px"}}>Home</Link></li>
        <li><Link to={"/foodMenu"} style={{fontSize:"20px"}}>Food Menu</Link></li>
        <li><Link to={"/cart"} style={{fontSize:"20px"}}>Cart</Link></li>
        <li><Link to={"/orders"} style={{fontSize:"20px"}}>Food Orders</Link></li>
        <li><Link to={"/history"} style={{fontSize:"20px"}}>Orders History</Link></li>
        <li><Link to={"/tables"} style={{fontSize:"20px"}}>Restaurant Tables</Link></li>
        <li><Link to={"/reservations"} style={{fontSize:"20px"}}>Table Reservations</Link></li>
        <li><Link to={"/logout"} style={{fontSize:"20px"}}>Logout</Link></li>
    </ul>
</nav>



</body> 
        </>
    )
}
export default CustomerHead
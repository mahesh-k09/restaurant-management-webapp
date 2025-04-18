import { Link } from "react-router-dom"

function Head(){
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
            <li><Link to={"/"} style={{marginTop:"20px"}}>Home</Link></li>
            <li><Link to={"/adminLogin"} style={{marginTop:"20px"}}>Admin</Link></li>
            <li><Link to={"/managerLogin"} style={{marginTop:"20px"}}>Manager</Link></li>
            <li><Link to={"/customerLogin"} style={{marginTop:"20px"}}>Customer</Link></li>
        </ul>
    </nav>

    

</body>           

     </>
    )
}
export default Head
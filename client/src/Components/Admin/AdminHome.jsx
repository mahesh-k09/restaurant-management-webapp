import AdminHead from "./ahead"

function AdminHome(){
    return(
        <>
        <div className="home-img">
        <AdminHead/>
        <div className="text-center h1 mt-5" style={{lineHeight:"200px"}}><b style={{background:"white"}}>Welcome To Admin Home Page</b></div>
        </div>
       

        </>
    )
}
export default AdminHome
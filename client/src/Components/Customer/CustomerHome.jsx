import CustomerHead from "./chead";

function CustomerHome(){
    return(
        <>
       
        <div className="home-img">
        <CustomerHead/>
        <div className="text-center h1 mt-5" style={{lineHeight:"200px"}}><b style={{background:"white"}}>Welcome To Customer Home Page</b></div>
        </div>
        </>
    )
}
export default CustomerHome;
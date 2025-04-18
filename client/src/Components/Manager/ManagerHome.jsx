import ManagerHead from "./mhead";

function ManagerHome(){
    return(
        <>
         <div className="home-img">
         <ManagerHead/>
         <div className="text-center h3 mt-5" style={{lineHeight:"200px"}}><b style={{background:"white"}}>Welcome To Manager Home Page</b></div>
         </div>
     
        </>
    )
}
export default ManagerHome;
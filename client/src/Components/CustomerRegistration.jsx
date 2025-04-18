import axios from "axios";
import Head from "./Head"
import { useNavigate } from "react-router-dom";
const rest = require("../EndPoints")

function CustomerRegistration(){

    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }
    const navigate = useNavigate([])
  

    const CustomerRegistrationAction = e =>{
        e.preventDefault();
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let password = document.getElementById("password").value;
        let address = document.getElementById("address").value;

        let data = {
            "name":name,
            "email":email,
            "phone":phone,
            "password":password,
            "address":address
        }
        console.log(data);
        

        axios.post(rest.endPointCustomerRegistration,data,header)
        .then(response=>{
            
            if(response.data.message!="Duplicate Details"){
                alert(response.data.message)
                navigate("/customerLogin")
            }else{
                alert(response.data.message)
                return
            }
            
            // document.getElementById("name").value=""
            // document.getElementById("phone").value=""
            // document.getElementById("email").value=""
            // document.getElementById("password").value=""
            // document.getElementById("address").value=""

            
        }).catch(e=>{
            console.log(e);
            
        })




    }
    return(
        <>
        <Head/>
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card p-3 mt-5">
                        <div className="text-center h4">New Customer Registration</div>
                        <form onSubmit={CustomerRegistrationAction}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control p-2 mt-1" id="name" placeholder="Enter Name" required></input>
                            </div>
                            <div className="form-group mt-1">
                                <label>Email</label>
                                <input type="email" className="form-control p-2 mt-1" id="email" placeholder="Enter Email" required></input>
                            </div>
                            <div className="form-group mt-1">
                                <label>Phone</label>
                                <input type="tel" className="form-control p-2 mt-1" id="phone" placeholder="Enter Phone" required></input>
                            </div>
                            <div className="form-group mt-1">
                                <label>Password</label>
                                <input type="password" className="form-control p-2 mt-1" placeholder="Enter Password" id="password" required></input>
                            </div>
                            <div className="form-group mt-1">
                                <label>Address</label>
                                <textarea   className="form-control p-2 mt-1" max={100} placeholder="Enter Address" id="address" required></textarea>
                            </div>
                           
                            <input type="submit" value={"Register"} className="btn btn-primary w-100 mt-3"></input>
                        </form>
                        

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default CustomerRegistration
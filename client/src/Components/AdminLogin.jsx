import axios from "axios"
import Head from "./Head"
import Cookies from "js-cookie"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const rest = require("../EndPoints")

function AdminLogin() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate([])

    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }

    // admin login action here, after submited form

   
    const AdminLoginAction = e => {
        e.preventDefault()
        if(userName.length==0){
            alert("Enter Name")
            return
        }

        if(password.length==0){
            alert("Enter Password")
            return
        }

        let data = {
            "userName": userName,
            "password": password
    
        }
    

        axios.post(rest.endPointAdminLogin, data, header).then(response => {

            
            if (response.data.message != "Invalid Login Details") {
                Cookies.set("token", response.data.token)
                Cookies.set("role", 'admin')
                navigate("/adminHome")
            } else {
                alert(response.data.message)
                return
            }


        }).catch(e => {
            console.log(e);

        })
    }


    return (
        <>
         <div className="home-img">
         <Head />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 mt-3">
                        <div className="card p-5 mt-4">
                            <div className="text-center h3 mb-2">Admin Login</div>
                            <form onSubmit={AdminLoginAction}>
                                <div className="form-group">
                                    <input type="text" id="userName" onChange={e => { setUserName(e.target.value) }} className="form-control p-3" placeholder="Enter Username"></input>
                                </div>
                                <div className="form-group mt-2">
                                    <input type="text" id="password" onChange={e => { setPassword(e.target.value) }} className="form-control p-3" placeholder="Enter Password"></input>
                                </div>
                                <div className="text-end">
                                    <input type="submit" value={"Login"} className="mt-3 w-100 p-2 btn btn-primary"></input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         </div>
            
        </>
    )
}
export default AdminLogin
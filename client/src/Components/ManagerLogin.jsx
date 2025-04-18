import { useNavigate } from "react-router-dom"
import Head from "./Head"
import Cookies from "js-cookie"
import { useState } from "react"
import axios from "axios"
const rest = require("../EndPoints")
function ManagerLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate([])

    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }

    const ManagerLoginAction = e => {
        e.preventDefault();

        if(email.length==0){
            alert("Enter Email")
            return
        }

        if(password.length==0){
            alert("Enter Password")
            return
        }
        

        let data = {
            "email": email,
            "password": password
        }

        axios.post(rest.endPointManagerLogin, data, header)
            .then(response => {
                console.log(response.data);
                if(response.data.message != "Invalid Login Details"){
                    Cookies.set("token",response.data.token)
                    Cookies.set("role","manager")
                    navigate("/managerHome")
                }else{
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
                    <div className="col-md-4 mt-4">
                        <div className="card p-5 mt-3">
                            <div className="text-center h3">Manager Login</div>
                            <form onSubmit={ManagerLoginAction}>
                                <div className="form-group">
                                    <input type="text" id="email" onChange={e => { setEmail(e.target.value) }} className="form-control p-3" placeholder="Enter Email"></input>
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
export default ManagerLogin
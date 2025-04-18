import axios from "axios";
import AdminHead from "./ahead"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const rest = require("../../EndPoints")
function Managers() {
    const[count,setCount] = useState([])
    const[managers,setManagers] = useState([])
    let header = {
        headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    useEffect(() => {
        axios.get(rest.endPointViewManager, header)
            .then(response => {
                console.log(response.data);
                setManagers(response.data)
                

            }).catch(e => {
                console.log(e);

            })

    }, [count])


    const AddNewManager  =e =>{
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

        axios.post(rest.endPointAddManager,data,header)
        .then(response=>{
            alert(response.data.message)
            setCount(count+1)
            
        }).catch(e=>{
            console.log(e);
            
        })


    }
    return (
        <>
        <div className="home-img">
        <AdminHead />
            <div className="container-fluid mt-2">
                <div className="text-center h4">Managers</div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                        <div className="card p-3 mt-5">
                            <div className="text-center h4 mb-3">Add New Manager</div>
                            <form onSubmit={AddNewManager}> 
                                <div className="form-group">
                                    <input type="text" id="name"  className="form-control p-2" placeholder="Enter Name" required></input>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="email" id="email"  className="form-control p-2" placeholder="Enter Email" required></input>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="tel" id="phone"  className="form-control p-2" placeholder="Enter Phonenumber" required></input>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="password" id="password"  className="form-control p-2" placeholder="Enter Password" required></input>
                                </div>
                                <div className="form-group mt-3">
                                    <textarea  id="address"  className="form-control p-2" placeholder="Enter Address" required></textarea>
                                </div>
                                <input type="submit" value={"Add New Manager"} className="btn btn-success w-100 mt-3"></input>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6 mt-4">
                        <table className="table table-bordered mt-3">
                           <thead>
                            <tr>
                                <th>ManagerId</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>

                            </tr>
                           </thead>
                           <tbody>
                            {managers.map((manager,index)=>
                             <tr key={index}>
                                 <td>{manager['manager_id']}</td>
                                <td>{manager['name']}</td>
                                <td>{manager['email']}</td>
                                <td>{manager['phone']}</td>
                                <td>{manager['address']}</td>
                             </tr>
                            )}
                           </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
            
        </>
    )
}
export default Managers
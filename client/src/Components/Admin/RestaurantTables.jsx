import { useEffect, useState } from "react";
import AdminHead from "./ahead";
import Cookies from "js-cookie";
import axios from "axios";
import ManagerHead from "../Manager/mhead";
import { useNavigate } from "react-router-dom";
const rest = require("../../EndPoints")
function RestaurantTables() {
    const [tables, setTables] = useState([])
    const[count,setCount] = useState(0)
    const navigate = useNavigate([])
    let header = {
        headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    useEffect(() => {
        let data = {
            "role":Cookies.get("role")
        }
        axios.post(rest.endPointViewTable,data, header)
            .then(response => {
                console.log(response.data);
                setTables(response.data)

            }).catch(e => {
                console.log(e);

            })
    },[count])



    const AddManagerNewTable  =e =>{
        e.preventDefault();
        let table_number = document.getElementById("table_number").value;
        let seating_capacity = document.getElementById("seating_capacity").value;
        let location = document.getElementById("location").value;
        let price = document.getElementById("price").value;


        let data = {
            "seating_capacity": seating_capacity,
            "location": location,
            "table_number": table_number,
            "price":price,
        }
    


        axios.post(rest.endPointAddTable2, data, header)
            .then(response => {
                console.log(response.data);
                setCount(count+1)
            }).catch(e => {
                console.log(e);

            })
    }



    const AddNewTable = e => {
        e.preventDefault();
        let table_number = document.getElementById("table_number").value;
        let seating_capacity = document.getElementById("seating_capacity").value;
        let location = document.getElementById("location").value;
        let price = document.getElementById("price").value;


        let data = {
            "seating_capacity": seating_capacity,
            "location": location,
            "table_number": table_number,
            "price":price,
            "role":Cookies.get("role")
        }
    


        axios.post(rest.endPointAddTable, data, header)
            .then(response => {
                console.log(response.data);
                setCount(count+1)
            }).catch(e => {
                console.log(e);

            })




    }

    const EditTable = (table_id) =>{
        navigate("/editTable?table_id="+table_id)
    }
    return (
        <>
         <div className="food-img">
         {Cookies.get("role")=='manager'?<> <ManagerHead/></>:<></>}
             {Cookies.get("role")=='admin'?<> <AdminHead/></>:<></>}
             {Cookies.get("role")=='admin'?<>
                <div className="container-fluid mt-2">
                <div className="text-center h4">Restaurant Tables</div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                        <div className="card p-3 mt-5">
                            <div className="text-center h4 mb-3">Add New Table</div>
                            <form onSubmit={AddNewTable}>
                                <div className="form-group">
                                    <input type="text" id="table_number" className="form-control p-3" placeholder="Enter Table Number"></input>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="number" id="seating_capacity" min={1} className="form-control p-3" placeholder="Enter SeatCapacity"></input>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="number" id="price" value={"10"} min={1} className="form-control p-3" placeholder="Enter Price"></input>
                                </div>

                                <div className="form-group mt-3">
                                    <input type="text" id="location" className="form-control p-3" placeholder="Enter Table Location"></input>
                                </div>
                                <input type="submit" value={"Add Table"} className="btn btn-success w-100 mt-3"></input>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6 mt-4">
                       <div className="row">
                        {tables.map((table,index)=>
                         <div className="col-md-4">
                            <div className="card mt-2">
                                <div className="card-header">
                                    <div className="h5 text-center" style={{fontSize:"23px"}}>{table['table_number']}</div>
                                    <div className="row">
                                        <div className="col-md-6 mt-1">
                                            <div className="text-secondary" style={{fontSize:"12px"}}>Seat Capacity</div>
                                            <div className="h4 " style={{fontSize:"15px"}}>{table['seating_capacity']}</div>
                                        </div>
                                        <div className="col-md-6 mt-1">
                                        <div className="text-secondary" style={{fontSize:"12px"}}>Table Location</div>
                                        <div className="h4 " style={{fontSize:"15px"}}>{table['location']}</div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mt-2" onClick={()=>{EditTable(table['table_id'])}} style={{fontSize:"12px"}}>Edit</button>
                                </div>
                            </div>
                         </div>
                        )}
                       </div>
                    </div>
                </div>
            </div>
             </>:<>
             <div className="container-fluid mt-2">
                <div className="text-center h4">Restaurant Tables</div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                        <div className="card p-3 mt-5">
                            <div className="text-center h4 mb-3">Add New Table</div>
                            <form onSubmit={AddManagerNewTable}>
                                <div className="form-group">
                                    <input type="text" id="table_number" className="form-control p-3" placeholder="Enter Table Number"></input>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="number" id="seating_capacity" min={1} className="form-control p-3" placeholder="Enter SeatCapacity"></input>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="number" id="price" value={"10"} min={1} className="form-control p-3" placeholder="Enter Price"></input>
                                </div>

                                <div className="form-group mt-3">
                                    <input type="text" id="location" className="form-control p-3" placeholder="Enter Table Location"></input>
                                </div>
                                <input type="submit" value={"Add Table"} className="btn btn-success w-100 mt-3"></input>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6 mt-4">
                       <div className="row">
                        {tables.map((table,index)=>
                         <div className="col-md-4">
                            <div className="card mt-2">
                                <div className="card-header">
                                    <div className="h5 text-center" style={{fontSize:"23px"}}>{table['table_number']}</div>
                                    <div className="row">
                                        <div className="col-md-6 mt-1">
                                            <div className="text-secondary" style={{fontSize:"12px"}}>Seat Capacity</div>
                                            <div className="h4 " style={{fontSize:"15px"}}>{table['seating_capacity']}</div>
                                        </div>
                                        <div className="col-md-6 mt-1">
                                        <div className="text-secondary" style={{fontSize:"12px"}}>Table Location</div>
                                        <div className="h4 " style={{fontSize:"15px"}}>{table['location']}</div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mt-2" onClick={()=>{EditTable(table['table_id'])}} style={{fontSize:"12px"}}>Edit</button>

                                </div>
                            </div>
                         </div>
                        )}
                       </div>
                    </div>
                </div>
            </div>
             </>}
         </div>
             
            
        </>
    )
}
export default RestaurantTables;
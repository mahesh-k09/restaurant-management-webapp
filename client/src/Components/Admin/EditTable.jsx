import { useNavigate } from "react-router-dom";
import ManagerHead from "../Manager/mhead";
import AdminHead from "./ahead";
import Cookies from "js-cookie";
import { useEffect } from "react";
import axios from "axios";
const rest = require("../../EndPoints")
function EditTable(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let table_id = params.get('table_id');

    const navigate = useNavigate([])

    const header = {
        headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
        }

    }

    useEffect(() => {
        let data = {
            "table_id":table_id
        }
        axios.post(rest.endPointGetTable,data, header)
            .then(response => {
                console.log(response.data);
                document.getElementById("table_number").value=response.data[0]['table_number'];
                document.getElementById("seating_capacity").value=response.data[0]['seating_capacity'];
                document.getElementById("price").value=response.data[0]['price'];
                document.getElementById("location").value=response.data[0]['location'];

            }).catch(e => {
                console.log(e);

            })
    },[])

    const EditTableAction = e =>{
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
            "table_id":table_id
        }
    


        axios.post(rest.endPointUpdateTable, data, header)
            .then(response => {
                console.log(response.data);
                navigate("/restaurantTables")
            }).catch(e => {
                console.log(e);

            })
    }
    return(
        <>
         {Cookies.get("role")=='manager'?<> <ManagerHead/></>:<></>}
         {Cookies.get("role")=='admin'?<> <AdminHead/></>:<></>}
         <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-5">
                <div className="card p-3 mt-5">
                            <div className="text-center h4 mb-3">Edit  Table</div>
                            <form onSubmit={EditTableAction}>
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
                                <input type="submit" value={"Edit Table"} className="btn btn-success w-100 mt-3"></input>
                            </form>
                        </div>
                </div>
                <div className="col-md-3"></div>
            </div>
         </div>
        </>
    )
}
export default EditTable;
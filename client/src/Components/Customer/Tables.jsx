import { useEffect, useState } from "react"
import CustomerHead from "./chead"
import Cookies from "js-cookie"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const rest = require("../../EndPoints")
function Tables(){
    const [tables, setTables] = useState([])
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
    },[])

    const bookTable = (table_id,price) =>{
           navigate("/reserveTable?table_id="+table_id+"&price="+price)
    }
    return(
        <>
        <div className="food-img">
        <CustomerHead/>
        <div className="container-fluid mt-2">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="row">
                    {tables.map((table,index)=>
                         <div className="col-md-4">
                            <div className="card mt-4">
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
                                    <button onClick={()=>{bookTable(table['table_id'],table['price'])}} className="btn btn-primary" style={{fontSize:"13px"}}>Reserve</button>
                                </div>
                            </div>
                         </div>
                        )}
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
        </div>
       

        </>
    )
}
export default Tables
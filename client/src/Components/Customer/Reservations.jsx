import { useEffect, useState } from "react";
import CustomerHead from "./chead";
import Cookies from "js-cookie";
import axios from "axios";
import ManagerHead from "../Manager/mhead";
import AdminHead from "../Admin/ahead";
const rest = require("../../EndPoints")
function Reservations(){
    const [reservations, setReservations] = useState([])
    const[count,setCount] = useState(0)

    let header = {
        headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    useEffect(()=>{
        let data = {
            "role":Cookies.get("role")
        }
        axios.post(rest.endPointReservations,data,header)
        .then(response=>{
            console.log(response.data);
            
            setReservations(response.data)
            
        }).catch(e=>{
            console.log(e);
            
        })

    },[count])

    const CancelTableReservation = e =>{
        e.preventDefault();
        let reservation_id = e.target[0].value;

        let data = {
            "reservation_id":reservation_id
        }

        axios.post(rest.endPointCancelTableReservation,data,header)
        .then(response=>{
            console.log(response.data);
            setCount(count+1)
            
        }).catch(e=>{
            console.log(e);
            
        })
    }


    const RelaseTableReservation = e =>{
        e.preventDefault();
        let reservation_id = e.target[0].value;

        let data = {
            "reservation_id":reservation_id
        }

        axios.post(rest.endPointRelaseTableReservation,data,header)
        .then(response=>{
            console.log(response.data);
            setCount(count+1)
            
        }).catch(e=>{
            console.log(e);
            
        })
    }

    return(
        <>
       <div className="food-img">
       {Cookies.get("role")=='customer'?<> <CustomerHead/></>:<></>}
        {Cookies.get("role")=='manager'?<> <ManagerHead/></>:<></>}
        {Cookies.get("role")=='admin'?<> <AdminHead/></>:<></>}
        {reservations.length==0?<>
        <div className="mt-5 text-center h3">Data Not Found</div>
        </>:<>
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="row">
                        {reservations.map((reservation,index)=>
                          <div className="col-md-6">
                            <div className="card p-3 mt-2" style={{"boxShadow":'0px 3px 3px #FFA07A'}}>
                                 <div className="text-center" style={{fontSize:"10px"}}>Reserved<br></br></div>
                                 <div className="text-center"><b className="">{reservation['table_number']}</b></div>
                                 <div className="row">
                                    <div className="col-md-6">
                                        <div className="text-secondary" style={{fontSize:"13px"}}>Reserved Time</div>
                                        <div className="h5 mt-1" style={{fontSize:"13px"}}>{reservation['start_time']}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="text-secondary" style={{fontSize:"13px"}}>Reserved By</div>
                                        <div className="h5 mt-1" style={{fontSize:"13px"}}>{reservation['name']} ({reservation['phone']})</div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="text-secondary" style={{fontSize:"13px"}}>Reserved Until</div>
                                        <div className="h5 mt-1" style={{fontSize:"13px"}}>{reservation['end_time']} </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="text-secondary" style={{fontSize:"13px"}}>Status</div>
                                        <div className="h5 mt-1" style={{fontSize:"13px"}}>{reservation['status']} </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="text-secondary" style={{fontSize:"13px"}}>Table Location</div>
                                        <div className="h5 mt-1" style={{fontSize:"13px"}}>{reservation['location']} </div>
                                    </div>
                                    {Cookies.get("role")=='customer'?<>
                                    {reservation['status']=='Reserved'?<>
                                        <div className="col-md-6">
                                            <form onSubmit={CancelTableReservation}>
                                                <input type="hidden" id="reservation_id" value={reservation['reservation_id']}></input>
                                                <input type="submit" value={"Cancel Reservation"} className="btn btn-danger w-100 mt-2" style={{fontSize:"13px"}}></input>
                                            </form>
                                        </div>
                                    </>:<></>}
                                        
                                    </>:<></>}
                                    {Cookies.get("role")=='manager'?<>
                                    {reservation['status']=='Reserved'?<>
                                        <div className="col-md-6">
                                            <form onSubmit={RelaseTableReservation}>
                                                <input type="hidden" id="reservation_id" value={reservation['reservation_id']}></input>
                                                <input type="submit" value={"Relase Table"} className="btn btn-primary w-100 mt-2" style={{fontSize:"13px"}}></input>
                                            </form>
                                        </div>
                                    </>:<></>}
                                        
                                    </>:<></>}
                                    {Cookies.get("role")=='admin'?<>
                                    {reservation['status']=='Reserved'?<>
                                        <div className="col-md-6">
                                            <form onSubmit={RelaseTableReservation}>
                                                <input type="hidden" id="reservation_id" value={reservation['reservation_id']}></input>
                                                <input type="submit" value={"Relase Table"} className="btn btn-primary w-100 mt-2" style={{fontSize:"13px"}}></input>
                                            </form>
                                        </div>
                                    </>:<></>}
                                        
                                    </>:<></>}
                                    
                                 </div>
                            </div>
                          </div>
                        )}
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
        </>}
       
       </div>
        

        </>
    )
}
export default Reservations;
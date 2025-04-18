import { useNavigate } from "react-router-dom";
import CustomerHead from "./chead";
import Cookies from "js-cookie";
import axios from "axios";
const rest = require("../../EndPoints")
function ReserveTable(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let table_id = params.get('table_id');
    let price = params.get("price");

    const navigate = useNavigate([])

    const header = {
        headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
        }

    }

    const ReserveTableAction = e =>{
        e.preventDefault();
        let reservation_time = document.getElementById("reservation_time").value;
        let card_number = document.getElementById("card_number").value;
        let expire_date = document.getElementById("expire_date").value;
        let cvv = document.getElementById("cvv").value;

        if (card_number.length != 16) {
            alert("Card Number Should be 16")
            e.preventDefault();
            return
        }

        if (cvv.length != 3) {
            alert("Invalid CVV")
            e.preventDefault();
            return
        }


        if (expire_date.length != 5) {
            alert("Invalid Expire Date")
            e.preventDefault();
            return
        }



        let data = {
            "reservation_time":reservation_time,
            "price":price,
            "table_id":table_id
        }

        axios.post(rest.endPointReserveTable,data,header)
        .then(response=>{
            console.log(response.data);
           if(response.data.message==='Table Reserved In These Timings'){
                alert(response.data.message)
                return
           }else{
            navigate("/tables")
           }
            
            
        }).catch(e=>{
            console.log(e);
            
            
        })



    }




    return(
        <>
        <CustomerHead/>
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-md-2"></div>
                    <div className="col-md-10">
                    <form onSubmit={ReserveTableAction}>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card p-3">
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input type="datetime-local" id="reservation_time" className="form-control mt-1"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                            <div class="card p-3">
                                        <input type="hidden" name="table_id" id="table_id" value={table_id} />
                                        <div class=" h4 text-center mt-3">Total Price :  <h4> $ {price}</h4></div>
                                        <div class="mt-3">
                                            <label>Name On Card</label>
                                            <input type="text" name="card_name" id="card_name" placeholder="Card holder_name" class="form-control" />
                                        </div>
                                        <div class="mt-3">
                                            <label>Card Number</label>
                                            <input type="number" name="card_number" id="card_number" placeholder="Card Number" class="form-control" />
                                        </div>
                                        <div class="mt-3">
                                            <label>Expire Date</label>
                                            <input type="text" name="expire_date" id="expire_date" class="form-control" placeholder="Expire Date" />
                                        </div>
                                        <div class="mt-3">
                                            <label>CVV</label>
                                            <input type="text" name="cvv" id="cvv" class="form-control" placeholder="Enter CVV" />
                                        </div>

                                        <div class="mt-3">
                                            <input type="submit" value="Pay" class="btn btn-success w-100 mt-1" />
                                        </div>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                   
                <div className="col-md-1"></div>
            </div>
            
           
        </div>
        </>
    )
}
export default ReserveTable;
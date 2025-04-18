import { useNavigate } from "react-router-dom";
import CustomerHead from "./chead";
import Cookies from "js-cookie";
import axios from "axios";
const rest = require("../../EndPoints")
function PaymentPage() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let cart_id = params.get('cart_id');
    let totalPrice = params.get("totalPrice")
    let orderType = params.get("orderType")
    const navigate = useNavigate([])
    const header = {
        headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
        }

    }

    const PayAmountAction = e => {
        e.preventDefault();
        
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
            "cart_id": cart_id,
            "orderType": orderType,
            "totalPrice": totalPrice
        }



        axios.post(rest.endPointPlaceOrder, data, header)
            .then(response => {
                console.log(response.data);
                if(response.data.message=='Order Placed'){
                    navigate("/orders")
                }

            }).catch(e => {
                console.log(e);

            })
    }
    return (
        <>
            <CustomerHead />
            <div class="container-fluid mt-2">
                <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-8">

                        <div class="row">
                            <div class="col-md-2"></div>
                            <div class="col-md-6">
                                <div class="card p-3 mt-5">
                                    <form onSubmit={PayAmountAction}>
                                        <input type="hidden" name="cart_id" id="cart_id" value={cart_id} />
                                        <div class=" h4 text-center mt-3">Total Price :  <h4> $ {totalPrice}</h4></div>
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </>
    )
}
export default PaymentPage;
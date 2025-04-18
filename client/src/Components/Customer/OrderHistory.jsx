import { useEffect, useState } from "react"
import CustomerHead from "./chead"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import ManagerHead from "../Manager/mhead"
import AdminHead from "../Admin/ahead"
const rest = require("../../EndPoints")
function OrderHistory() {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate([])
    const [count, setCount] = useState(0)



    let header = {
        headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    let data = {
        "role": Cookies.get("role")
    }


    useEffect(() => {
        axios.post(rest.endPointOrderHistory, data, header)
            .then(response => {
                console.log(response.data);
                
                setOrders(response.data)

            }).catch(e => {
                console.log(e);

            })

    }, [])
    return (
        <>
        <div className="food-img">

       
            {Cookies.get("role") == 'manager' ? <><ManagerHead /></> : <></>}
            {Cookies.get("role") == 'customer' ? <><CustomerHead /></> : <></>}
            {Cookies.get("role") == 'admin' ? <><AdminHead /></> : <></>}
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div className="row">
                            {orders.map((order, index) =>
                                <div className="card p-3  mt-2" style={{ "boxShadow": '0px 3px 3px #FFA07A' }}>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="text-secondary" style={{ fontSize: "12px" }}>Order By  : <span></span></div>
                                            <div className="h6 mt-2" style={{ fontSize: "15px" }}>{order['customer_name']} (Customer)</div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="text-secondary" style={{ fontSize: "12px" }}>Order On</div>
                                            <div className="h6 mt-2" style={{ fontSize: "15px" }}>{order['date']}</div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="text-secondary" style={{ fontSize: "12px" }}>Order Status</div>
                                            <div className="h6 mt-2">{order['status']}</div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="text-secondary" style={{ fontSize: "12px" }}>Total Price</div>
                                            <div className="h5 mt-2" style={{ fontSize: "15px" }}>${order['totalPrice']}</div>
                                        </div>
                                        {order['orderType'] != "" ? <>
                                            <div className="col-md-3">
                                                <div className="text-secondary" style={{ fontSize: "12px" }}>Order Type</div>
                                                <div className="h5 mt-1" style={{ fontSize: "15px" }}>{order['orderType']}</div>
                                            </div>
                                            {order['deliveryBoyName'] != null ? <>
                                                <div className="col-md-4">
                                                    <div className="text-secondary" style={{ fontSize: "12px" }}>Delivery Boy</div>
                                                    <div className="h5 mt-1" style={{ fontSize: "15px" }}>{order['deliveryBoyName']} ({order['phone']})</div>
                                                </div>
                                            </> : <></>}


                                        </> : <></>}
                                    </div>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Order Quantity</th>
                                                <th>Product Price</th>
                                                <th>Total Price (O*P)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order['items'].map((item, index) =>
                                                <tr>
                                                    <td>{item['food_title']}</td>
                                                    <td>{item['quantity']}</td>
                                                    <td>${item['food_price']}</td>
                                                    <td>${parseFloat(item['quantity']) * parseFloat(item['food_price'])}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

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
export default OrderHistory
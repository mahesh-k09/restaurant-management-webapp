import { useNavigate } from "react-router-dom";
import CustomerHead from "./chead";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ManagerHead from "../Manager/mhead";
const rest = require("../../EndPoints")
function Orders() {
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
        axios.post(rest.endPointViewOrders, data, header)
            .then(response => {
                console.log(response.data);

                setOrders(response.data)

            }).catch(e => {
                console.log(e);

            })

    }, [count])

    const DeliverFoodToCustomer = e => {
        e.preventDefault();
        let cart_id = e.target[0].value;
        let status = e.target[1].value;
        let deliveryBoyName = e.target[2].value;
        let phone = e.target[3].value;



        let data = {
            "cart_id": cart_id,
            "status": status,
            "deliveryBoyName": deliveryBoyName,
            "phone": phone
        }
        axios.post(rest.endPointDeliverFood, data, header)
            .then(response => {
                console.log(response.data);
                setCount(count + 1)

            }).catch(e => {
                console.log(e);

            })

    }



    return (
        <>
 <div className="food-img">
 {Cookies.get("role") == 'manager' ? <><ManagerHead /></> : <></>}
            {Cookies.get("role") == 'customer' ? <><CustomerHead /></> : <></>}
            {orders.length === 0 ? <>
                <div className="text-center mt-5 h2">Data Not Found</div>

            </> : <>
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
                                            {order['orderType']!=""?<>
                                                <div className="col-md-3">
                                                <div className="text-secondary" style={{ fontSize: "12px" }}>Order Type</div>
                                                <div className="h5 mt-2" style={{ fontSize: "15px" }}>{order['orderType']}</div>
                                            </div>
                                            </>:<></>}
                                            
                                            
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
                                        <div className="">
                                            {order['status'] == 'Ordered' ? <>
                                                {Cookies.get("role") == 'manager' ? <>
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <form onSubmit={DeliverFoodToCustomer}>
                                                                <input type="hidden" id="cart_id" value={order['cart_id']}></input>
                                                                <input type="hidden" id="status" value={"Accepted"}></input>
                                                                <input type="hidden" id="deliveryBoyName" value={""}></input>
                                                                <input type="hidden" id="phone" value={""}></input>
                                                                <input type="submit" value={"Accept Order"} className="btn btn-success w-100 mt-3"></input>
                                                            </form>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <form onSubmit={DeliverFoodToCustomer}>
                                                                <input type="hidden" id="cart_id" value={order['cart_id']}></input>
                                                                <input type="hidden" id="status" value={"Rejected"}></input>
                                                                <input type="hidden" id="deliveryBoyName" value={""}></input>
                                                                <input type="hidden" id="phone" value={""}></input>
                                                                <input type="submit" value={"Reject Order"} className="btn btn-danger w-100 mt-3"></input>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </> : <></>}
                                            </> : <></>}
                                            {Cookies.get("role") == 'manager' ? <>
                                                {order['status'] == 'Accepted' ? <>
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <form onSubmit={DeliverFoodToCustomer}>
                                                                <input type="hidden" id="cart_id" value={order['cart_id']}></input>
                                                                <input type="hidden" id="status" value={"Preparing"}></input>
                                                                <input type="hidden" id="deliveryBoyName" value={""}></input>
                                                                <input type="hidden" id="phone" value={""}></input>
                                                                <input type="submit" value={"Mark As Preparing"} className="btn btn-primary w-100 mt-3"></input>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </> : <></>}
                                                {order['status'] == 'Preparing' ? <>
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <form onSubmit={DeliverFoodToCustomer}>
                                                                <input type="hidden" id="cart_id" value={order['cart_id']}></input>
                                                                <input type="hidden" id="status" value={"Order Ready"}></input>
                                                                <input type="hidden" id="deliveryBoyName" value={""}></input>
                                                                <input type="hidden" id="phone" value={""}></input>
                                                                <input type="submit" value={"Mark As Ready"} className="btn btn-primary w-100 mt-3"></input>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </> : <></>}
                                                {order['status'] == 'Order Ready' ? <>
                                                    {order['orderType'] == 'PickUp' ? <>
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <form onSubmit={DeliverFoodToCustomer}>
                                                                    <input type="hidden" id="cart_id" value={order['cart_id']}></input>
                                                                    <input type="hidden" id="status" value={"Order Picked"}></input>
                                                                    <input type="hidden" id="deliveryBoyName" value={""}></input>
                                                                    <input type="hidden" id="phone" value={""}></input>
                                                                    <input type="submit" value={"Mark As Order Picked"} className="btn btn-primary w-100 mt-3"></input>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </> : <>
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <form onSubmit={DeliverFoodToCustomer}>
                                                                    <input type="hidden" id="cart_id" value={order['cart_id']}></input>
                                                                    <input type="hidden" id="status" value={"Dispatched"}></input>
                                                                    <input type="text" id="deliveryBoyName" className="form-control" placeholder="Delivery Boy Name"></input>
                                                                    <input type="tel" id="phone" className="form-control mt-2" placeholder="Delivery Boy Contact"></input>

                                                                    <input type="submit" value={"Dispatch Order"} className="btn btn-primary w-100 mt-3"></input>
                                                                </form>
                                                            </div>

                                                        </div>
                                                    </>}

                                                </> : <></>}
                                            </> : <></>}

                                            {Cookies.get("role") == 'customer' ? <>
                                                {order['status'] == 'Ordered' ? <>
                                                    <form onSubmit={DeliverFoodToCustomer}>
                                                        <input type="hidden" id="cart_id" value={order['cart_id']}></input>
                                                        <input type="hidden" id="status" value={"Cancelled"}></input>
                                                        <input type="hidden" id="deliveryBoyName" value={""}></input>
                                                        <input type="hidden" id="phone" value={""}></input>
                                                        <input type="submit" value={"Cancel Order"} className="btn btn-danger mt-3"></input>
                                                    </form>
                                                </> : <></>}
                                                {order['status'] == 'Order Picked' ? <>
                                                    <form onSubmit={DeliverFoodToCustomer}>
                                                        <input type="hidden" id="cart_id" value={order['cart_id']}></input>
                                                        <input type="hidden" id="status" value={"Delivered"}></input>
                                                        <input type="hidden" id="deliveryBoyName" value={""}></input>
                                                        <input type="hidden" id="phone" value={""}></input>
                                                        <input type="submit" value={"Mark As Received"} className="btn btn-primary mt-3"></input>
                                                    </form>
                                                </> : <></>}
                                                {order['status'] == 'Dispatched' ? <>
                                                    <form onSubmit={DeliverFoodToCustomer}>
                                                        <input type="hidden" id="cart_id" value={order['cart_id']}></input>
                                                        <input type="hidden" id="status" value={"Delivered"}></input>
                                                        <input type="hidden" id="deliveryBoyName" value={""}></input>
                                                        <input type="hidden" id="phone" value={""}></input>
                                                        <input type="submit" value={"Mark As Received"} className="btn btn-primary mt-3"></input>
                                                    </form>
                                                </> : <></>}
                                            </> : <></>}

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
export default Orders;
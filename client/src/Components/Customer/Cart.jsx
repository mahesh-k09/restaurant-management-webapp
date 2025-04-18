import { useEffect, useState } from "react"
import CustomerHead from "./chead"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"
const rest = require("../../EndPoints")

function Cart() {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate([])
    const[count,setCount] = useState(0)



    let header = {
        headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }


    useEffect(() => {
        axios.get(rest.endPointViewCart, header)
            .then(response => {
                console.log(response.data);
                
                setOrders(response.data)

            }).catch(e => {
                console.log(e);

            })

    }, [count])

    
    const PlaceOrder  = e =>{
        e.preventDefault();
        let cart_id = e.target[0].value;
        let totalPrice = e.target[1].value;
        let orderType = e.target[2].value;
        navigate("/paymentPage?cart_id="+cart_id+"&totalPrice="+totalPrice+"&orderType="+orderType)
        

    }

    const RemoveItem = (cartitemid,cart_id,price,totalPrice) =>{
       let data = {
        "cartitemid":cartitemid,
        "cart_id":cart_id,
        "price":price,
        "totalPrice":totalPrice
       }
       console.log(data);
       
       axios.post(rest.endPointRemoveItem,data, header)
       .then(response => {
        if(response.data==null){
            setCount(count+1)
        }else{
            navigate("/foodMenu")
        }
       

       }).catch(e => {
           console.log(e);

       })

    }


    return (
        <>
         <div className="food-img">
         <CustomerHead />
         {orders.length==0?<><div className="text-center mt-5 h3">Data Not Found</div></>:<>
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
                                        <div className="h5 mt-2" style={{fontSize:"15px"}}>${order['totalPrice']}</div>
                                        </div>
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
                                        {order['items'].map((item,index)=>
                                          <tr>
                                            <td>{item['food_title']} <br></br><button className="btn btn-danger mt-2" onClick={()=>{RemoveItem(item['cartitemId'],order['cart_id'],item['food_price'],order['totalPrice'])}} style={{fontSize:"12px"}}>Remove</button></td>
                                            <td>{item['quantity']}</td>
                                            <td>${item['food_price']}</td>
                                            <td>${parseFloat(item['quantity'])*parseFloat(item['food_price'])}</td>
                                          </tr>
                                        )}
                                       </tbody>
                                    </table>
                                    <div className="">
                                        <form onSubmit={PlaceOrder}>
                                            <input type="hidden" id="cart_id" value={order['cart_id']}></input>
                                            <input type="hidden" id="totalPrice" value={order['totalPrice']}></input>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <select className="form-control mt-2" id="orderType">
                                                        <option value={""}>Choose Order Type</option>
                                                        <option value={"PickUp"}>Pick Up</option>
                                                        <option value={"Delivery"}>Delivery</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-3">
                                                    <input type="submit" value={"Order Now"} className="btn btn-primary w-100 mt-2"></input>
                                                </div>
                                            </div>
                                        </form>
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
export default Cart
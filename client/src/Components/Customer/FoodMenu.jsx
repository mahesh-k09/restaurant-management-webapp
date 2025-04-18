import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomerHead from "./chead";
const rest = require("../../EndPoints")

function FoodMenu(){
    const[foods,setFoods] = useState([])
    const navigate = useNavigate([])
    const [foodCategories, setFoodCategories] = useState([])//State to store fetched data
    const[foodCategoryId,setFoodCategoryId] = useState("")
    const[food_title,setFoodTitle] = useState("")

    let header = {
        headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    useEffect(() => {
        axios.get(rest.endPointViewFoodCategories, header)
            .then(response => {
                setFoodCategories(response.data)
                

            }).catch(e => {
                console.log(e);

            })

    }, [])
  
   let data  ={
    "foodCategoryId":foodCategoryId,
    "food_title":food_title
   }

   

    useEffect(()=>{
        axios.post(rest.endPointFoodMenu,data,header)
        .then(response=>{
            console.log(response.data);
            
            setFoods(response.data)
            
            
        }).catch(e=>{
            console.log(e);
            
        })

    },[food_title,foodCategoryId])
  
    const AddToCart = e =>{
        e.preventDefault();
        let food_id  = e.target[0].value;
        let quantity = e.target[1].value;
        let price = e.target[2].value;

        let data = {
            "quantity":quantity,
            "food_id":food_id,
            "price":price
        }

        

        axios.post(rest.endPointAddToCart,data,header)
        .then(response=>{
            console.log(response.data);
            navigate("/cart")
            

            
        }).catch(e=>{
            console.log(e);
            
        })


    }

    return(
        <>
        <div className="food-img">
        <CustomerHead/>
         <div className="conatainer-fluid mt-3">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-3">
                    <select className="form-control " onChange={e=>{setFoodCategoryId(e.target.value)}}>
                        <option value={""}>Choose By Category</option>
                        {foodCategories.map((foodCategory,index)=>
                         <option value={foodCategory['foodcategory_id']}>{foodCategory['foodCategoryName']}</option>
                        )}
                    </select>
                </div>
                <div className="col-md-3">
                    <input type="search" className="form-control" placeholder="Search Food" onChange={e=>{setFoodTitle(e.target.value)}}></input>
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-2"></div>
                
                <div className="col-md-8">
                {foods!='Not Found'?<>
                    <div className="row">
                        {foods.map((food,index)=>
                         <div className="col-md-4">
                            <div className="card p-3 mt-3" style={{"boxShadow":'0px 3px 3px #FFA07A'}}>
                            <img src={'data:image/jpeg;base64,'+food['image']} className="mt-1" style={{height:"150px",maxWidth:"100%",borderRadius:"30%"}}></img>
                                <div className="text-center h4 mt-1" style={{fontFamily: "cursive"}}>{food['food_title']} </div> 
                                <div className="text-center h6 mt-1">${food['price']}</div>
                                <div className="mt-1" style={{fontSize:"15px",overflow:"auto",height:"35px"}}>{food['description']}</div>
                                <div className="card-header">
                                <form onSubmit={AddToCart}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input type="hidden" id="food_id" value={food['food_id']}></input>
                                            <input type="number" id="quantity" className="form-control" placeholder="Quantity" style={{fontSize:"13px"}}></input>
                                            <input type="hidden" id="price" value={food['price']}></input>
                                        </div>
                                        <div className="col-md-6">
                                            <input type="submit" value={"Add To Cart"} className="btn btn-danger w-100" style={{fontSize:"13px"}}></input>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            </div>
                            
                        </div>
                       
                        )}
                    </div>
                </>:<>
                <div className="mt-5 text-center h3">Data Not Found</div>
                </>}
                   
                   
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
        </div>
        
        </>
    )
}
export default FoodMenu;
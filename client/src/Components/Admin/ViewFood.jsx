import { useNavigate } from "react-router-dom";
import AdminHead from "./ahead";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
const rest = require("../../EndPoints")

function ViewFood(){
    const[foods,setFoods] = useState([])
    const navigate = useNavigate([])


    let header = {
        headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    useEffect(()=>{
        axios.get(rest.endPointViewFood,header)
        .then(response=>{
            console.log(response.data);
            setFoods(response.data)
            
        }).catch(e=>{
            console.log(e);
            
        })

    },[])


    const addFood = () =>{
        navigate("/addFood")
        
    }

    const EditFood  =e =>{
        e.preventDefault();
        let food_id = e.target[0].value;
        navigate("/editFood?food_id="+food_id)
    }

    return(
        <>
        <div className="food-img">
        <AdminHead/>
        <div className="conatainer-fluid mt-3">
            <div className="text-end">
                <button className="btn btn-primary" onClick={()=>{addFood()}}>Add Food</button>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="row">
                        {foods.map((food,index)=>
                        <div className="col-md-4">
                            <div className="card p-3 mt-3" style={{"boxShadow":'0px 3px 3px #FFA07A'}}>
                            <img src={'data:image/jpeg;base64,'+food['image']} className="mt-1" style={{height:"150px",maxWidth:"100%",borderRadius:"30%"}}></img>
                                <div className="text-center h4 mt-1" style={{fontFamily: "cursive"}}>{food['food_title']} </div> 
                                <div className="text-center h6 mt-1">${food['price']}</div>
                                <div className="mt-1" style={{fontSize:"15px",overflow:"auto",height:"35px"}}>{food['description']}</div>
                            <div className="card-header">
                                <form onSubmit={EditFood}>
                                    <input type="hidden" id="food_id" value={food['food_id']}></input>
                                    <input type="submit" value={"Edit"} className="btn btn-primary"></input>
                                </form>
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
export default ViewFood;
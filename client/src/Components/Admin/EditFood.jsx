import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminHead from "./ahead";
import ManagerHead from "../Manager/mhead";
const rest = require("../../EndPoints")
function EditFood(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let food_id = params.get('food_id');
    const navigate = useNavigate([])
    const [foodCategories, setFoodCategories] = useState([])//State to store fetched data

    useEffect(() => {
        axios.get(rest.endPointViewFoodCategories, header)
            .then(response => {
                setFoodCategories(response.data)


            }).catch(e => {
                console.log(e);

            })

    }, [])

    const header = {
        headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
        }

    }

    let data = {
        "food_id":food_id
    }

    useEffect(()=>{
        axios.post(rest.endPointGetFood,data,header)
        .then(response=>{
            console.log(response.data);
            document.getElementById("title").value=response.data[0]['food_title'];
            document.getElementById("price").value=response.data[0]['price'];
            document.getElementById("is_vegetarian").value=response.data[0]['is_vegetarian'];
            document.getElementById("foodcategory_id").value=response.data[0]['foodcategory_id'];
            document.getElementById("description").value=response.data[0]['description'];
            
        }).catch(e=>{
            console.log(e);
            
        })

    },[food_id])

    const EditFoodAction  =e =>{
        e.preventDefault();
        let title = document.getElementById("title").value;
        let price = document.getElementById("price").value;
        let is_vegetarian = document.getElementById("is_vegetarian").value;
        let foodcategory_id = document.getElementById("foodcategory_id").value;
        let description = document.getElementById("description").value;

        let forms = {
            "food_title":title,
            "price":price,
            "is_vegetarian":is_vegetarian,
            "foodcategory_id":foodcategory_id,
            "description":description,
            "food_id":food_id
        }

        axios.post(rest.endPointUpdateFood,forms,header)
        .then(response=>{
            console.log(response.data);
            if(Cookies.get("role")=='admin'){
                navigate("/viewFood")
            }else{
                navigate("/managerViewFood")
            }
            
            
        }).catch(e=>{
            console.log(e);
            
        })

    }

    return(
        <>
     {Cookies.get("role") == 'admin' ? <><AdminHead /></> : <></>}
     {Cookies.get("role") == 'manager' ? <><ManagerHead /></> : <></>}
     <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-3"></div>
                    <div className="col-md-4">
                        <div className="card p-4 mt-3">
                            <div className="text-center h4">Edit Food</div>
                            <form onSubmit={EditFoodAction}>
                                <div className="form-group">
                                    <label>Food Name</label>
                                    <input type="text" className="form-control p-2 mt-1" id="title" ></input>
                                </div>
                                <div className="form-group mt-2">
                                    <label>Price</label>
                                    <input type="number" min={1} className="form-control p-2 mt-1" id="price" placeholder="Enter Price"></input>
                                </div>
                                <div className="form-group mt-2">
                                    <label>Is_Vegetarian</label>
                                    <select className="form-control p-2 mt-1" id="is_vegetarian">
                                        <option value={"No"}>No</option>
                                        <option value={"Yes"}>Yes</option>
                                    </select>
                                </div>

                                <div className="form-group mt-2">
                                    <label>Food Categories</label>
                                    <select className="form-control mt-2" id="foodcategory_id">
                                        <option value={""}>Choose Category</option>
                                        {foodCategories.map((foodCategory, index) =>
                                            <option value={foodCategory['foodcategory_id']}>{foodCategory['foodCategoryName']}</option>
                                        )}
                                    </select>
                                </div>
                               
                                <div className="form-group mt-2">
                                    <label>Description</label>
                                    <textarea className="form-control p-2 mt-1" id="description" placeholder="Enter Description"></textarea>
                                </div>
                                <input type="submit" value={"Edit Food"} className="btn btn-success w-100 mt-3"></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditFood
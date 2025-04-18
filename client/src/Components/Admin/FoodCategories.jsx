import { useEffect, useState } from "react";
import AdminHead from "./ahead";
import Cookies from "js-cookie";
import axios from "axios";
const rest = require("../../EndPoints")
function FoodCategories() {
    const [foodCategoryName, setFoodCategoryName] = useState("")  
    const [foodCategories, setFoodCategories] = useState([])//State to store fetched data
    const[count,setCount] = useState(0)

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

    }, [count])




    const AddFoodCategory = () => {
        let data = {
            "foodCategoryName": foodCategoryName
        }
        axios.post(rest.endPointAddFoodCategory, data, header)
            .then(response => {
                alert(response.data.message)
                setCount(count+1)

            }).catch(e => {
                console.log(e);

            })



    }


    return (
        <>
        
            <AdminHead />
            <div className="h5 text-center mt-4">Food Categories</div>

            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-6 mt-2">
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" onChange={e => { setFoodCategoryName(e.target.value) }} placeholder="Enter FoodCategory" className="form-control p-3" id="foodCategoryName"></input>
                            </div>
                            <div className="col-md-6">
                                <button className="nav-link mt-2" onClick={() => { AddFoodCategory() }}><img src="https://cdn-icons-png.flaticon.com/128/10337/10337579.png" style={{ width: "45px" }}></img></button>
                            </div>
                        </div>
                        <table className="table table-bordered mt-5">
                            <thead>
                                <tr>
                                    <th>Food CategoryId</th>
                                    <th>Food CategoryName</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodCategories.map((foodCategory,index)=>
                                 <tr>
                                    <td>{foodCategory['foodcategory_id']}</td>
                                    <td>{foodCategory['foodCategoryName']}</td>
                                 </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                </div>

            </div>
        </>
    )
}
export default FoodCategories;
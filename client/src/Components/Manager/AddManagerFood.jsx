import { useEffect, useState } from "react";
import ManagerHead from "./mhead"
import axios from "axios";
import Cookies from "js-cookie";
const rest = require("../../EndPoints")
function AddManagerFood(){
    const [state, setState] = useState([])
    const [count, setCount] = useState(0);
    const [foodCategories, setFoodCategories] = useState([])//State to store fetched data

    let header = {
        headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    const fileSelectedHandler = (event) => {
        setState({
            selectedFile: event.target.files[0],
        })
    }
    useEffect(() => {
        axios.get(rest.endPointViewFoodCategories, header)
            .then(response => {
                setFoodCategories(response.data)


            }).catch(e => {
                console.log(e);

            })

    }, [])

    const AddManagerFoodAction = e => {
        e.preventDefault();
        let title = document.getElementById("title").value;
        let price = document.getElementById("price").value;
        let is_vegetarian = document.getElementById("is_vegetarian").value
        let foodcategory_id = document.getElementById("foodcategory_id").value;
        let description = document.getElementById("description").value;

      let formData = new FormData();
      formData.append("title",title)
      formData.append("price",price)
      formData.append("is_vegetarian",is_vegetarian)
      formData.append("foodcategory_id",foodcategory_id)
      formData.append("description",description)
      formData.append("image",state.selectedFile)

     
        axios.post(rest.endPointAddManagerFood, formData, header)
            .then(response => {
                console.log(response.data.message);

            }).catch(e => {
                console.log(e);

            })

    }

  
   

    return(
        <>
         <div className="food-img">

         <ManagerHead/>
        <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-3"></div>
                    <div className="col-md-4">
                        <div className="card p-4 mt-3">
                            <div className="text-center h4">Add New Food</div>
                            <form onSubmit={AddManagerFoodAction}>
                                <div className="form-group">
                                    <label>Food Name</label>
                                    <input type="text" className="form-control p-2 mt-1" id="title" placeholder="Enter Title" required></input>
                                </div>
                                <div className="form-group mt-2">
                                    <label>Price</label>
                                    <input type="number" min={1} className="form-control p-2 mt-1" id="price" placeholder="Enter Price" required></input>
                                </div>
                                <div className="form-group mt-2">
                                    <label>Is_Vegetarian</label>
                                    <select className="form-control p-2 mt-1" id="is_vegetarian" required>
                                        <option value={"No"}>No</option>
                                        <option value={"Yes"}>Yes</option>
                                    </select>
                                </div>

                                <div className="form-group mt-2">
                                    <label>Food Categories</label>
                                    <select className="form-control mt-2" id="foodcategory_id" required>
                                        <option value={""}>Choose Category</option>
                                        {foodCategories.map((foodCategory, index) =>
                                            <option value={foodCategory['foodcategory_id']}>{foodCategory['foodCategoryName']}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="form-group mt-2">
                                    <label>Upload Image</label>
                                    <input type="file" onChange={fileSelectedHandler} className="form-control p-2 mt-1" id="image" required></input>
                                </div>
                                <div className="form-group mt-2">
                                    <label>Description</label>
                                    <textarea className="form-control p-2 mt-1" id="description" placeholder="Enter Description" required></textarea>
                                </div>
                                <input type="submit" value={"Add New Food"} className="btn btn-success w-100 mt-3"></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         </div>
       
        </>
    )
}
export default AddManagerFood
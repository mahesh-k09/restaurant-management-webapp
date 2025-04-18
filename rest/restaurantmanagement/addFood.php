<?php  include 'dbConn.php'?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$target_path = "uploads/";  
$target_path = $target_path.basename($_FILES['image']['name']);   
echo $target_path;

if(move_uploaded_file($_FILES['image']['tmp_name'], $target_path)) {  
    echo "File uploaded successfully!";  
} else{  
    echo "Sorry, file not uploaded, please try again!";  
}  
$title = isset($_POST['title']) ? $_POST['title'] : '';
$description = isset($_POST['description']) ? $_POST['description'] : '';
$price = isset($_POST['price']) ? $_POST['price'] : '';
$image = $_FILES['image']['name'];
$is_vegetarian = isset($_POST['is_vegetarian']) ? $_POST['is_vegetarian'] : '';
$foodcategory_id = isset($_POST['foodcategory_id']) ? $_POST['foodcategory_id'] : '';
if($title!=""){
    $sql = "insert into food(food_title,description,price,image,is_vegetarian,foodcategory_id) values('".$title."','".$description."','".$price."','".$image."','".$is_vegetarian."','".$foodcategory_id."')";
    if($conn->query($sql)==True){
        $response = [
            'message' => "Food Added Successfully",
        ];
    }else{
        $response = [
            'message' => "Fail To Add Food",
        ];
    }
    
}

echo json_encode($response);

?>

<?php  include 'dbConn.php'?>
<?php 
require 'vendor/autoload.php';
use Firebase\JWT\JWT; 
use Firebase\JWT\Key;

?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$target_path = "uploads/";  
$target_path = $target_path.basename($_FILES['image']['name']);   

if(move_uploaded_file($_FILES['image']['tmp_name'], $target_path)) {  
    echo "File uploaded successfully!";  
} else{  
    echo "Sorry, file not uploaded, please try again!";  
}  

$headers = getallheaders();

// Check if the 'Authorization' header is present
if (isset($headers['Authorization'])) {
    // Get the token from the Authorization header
    $authHeader = $headers['Authorization'];

    // Typically, the token is sent in the format "Bearer <token>"
    list($type, $token) = explode(" ", $authHeader, 2);
    
    if ($type === 'Bearer') {
        // Now you have the token in $token
        $secretKey = 'restaruant'; 
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
        echo json_encode([
            "status" => "success",
            "message" => "Token retrieved successfully",
            "token" => $token
        ]);
        $manager_id = $decoded->userId;
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
            $sql = "insert into food(food_title,description,price,image,is_vegetarian,foodcategory_id,manager_id) values('".$title."','".$description."','".$price."','".$image."','".$is_vegetarian."','".$foodcategory_id."','".$manager_id."')";
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

    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid authorization type"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Authorization header not found"
    ]);
}

?>
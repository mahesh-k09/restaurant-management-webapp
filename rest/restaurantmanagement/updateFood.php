<?php  include 'dbConn.php'?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
$input = json_decode(file_get_contents("php://input"), true);
$food_id = $input['food_id'];
$food_title = $input['food_title'];
$price = $input['price'];
$is_vegetarian = $input['is_vegetarian'];
$foodcategory_id = $input['foodcategory_id'];
$description = $input['description'];
if($food_id!=""){
    $sql = "update food set food_title='".$food_title."',price='".$price."',is_vegetarian='".$is_vegetarian."',foodcategory_id='".$foodcategory_id."', description='".$description."' where  food_id='".$food_id."'";
    
    file_put_contents("php://stderr", "Received data: " . print_r($sql, true) . "\n");
    if($conn->query($sql)==True){
        $response = [
            'message' => "Food Updated Successfully",
        ];
    }else{
        $response = [
            'message' => "Fail To Update Food",
        ];
    }
}





?>
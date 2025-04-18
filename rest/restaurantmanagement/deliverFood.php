<?php  include 'dbConn.php'?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$input = json_decode(file_get_contents("php://input"), true);
$cart_id = $input['cart_id'];
$status = $input['status'];
$deliveryBoyName = $input['deliveryBoyName'];
$phone = $input['phone'];
if($deliveryBoyName=="" && $phone==""){
    $sql= "update cart set status ='".$status."' where cart_id = '".$cart_id."'";
    if($conn->query($sql)==True){
        $response = [
            'message' => "Order Accepted",
        ];
    }
    
    echo json_encode($response);

}else{
    $sql= "update cart set status ='".$status."',deliveryBoyName='".$deliveryBoyName."',phone='".$phone."' where cart_id = '".$cart_id."'";
    if($conn->query($sql)==True){
        $response = [
            'message' => "Order Accepted",
        ];
    }
    
    echo json_encode($response);
  
}
?>
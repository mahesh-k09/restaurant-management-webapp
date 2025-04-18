<?php  include 'dbConn.php'?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$input = json_decode(file_get_contents("php://input"), true);
$cart_id = $input['cart_id'];
$orderType = $input['orderType'];
$totalPrice = $input['totalPrice'];
if($cart_id!=""){
    $sql= "update cart set status ='Ordered',orderType='".$orderType."' where cart_id = '".$cart_id."'";
    if($conn->query($sql)==True){
      $sql2 = "insert into payments (cart_id,amount,status) values('".$cart_id."','".$totalPrice."','Amount Paid')";
      if($conn->query($sql2)==TRUE){
        $response = [
            'message' => "Order Placed",
        ];
      }
    }
    
    echo json_encode($response);

}
?>
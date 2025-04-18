<?php  include 'dbConn.php'?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$input = json_decode(file_get_contents("php://input"), true);
$cart_id = $input['cart_id'];
$cartitemid = $input['cartitemid'];
$price = $input['price'];
$totalPrice = $input['totalPrice'];
if($cart_id!=""){
    $sql4 = "select * from cartitems where cartitemId = '".$cartitemid."'";
    $cartitems = $conn->query($sql4);
    foreach($cartitems as $cartitem){
      $quantity = $cartitem['quantity'];
      $price2 = $price*$quantity;
      $totalPrice2 = $totalPrice-$price2;
      $sql5 = "update cart set totalPrice='".$totalPrice2."' where cart_id='".$cart_id."'";
      $conn->query($sql5)==True;
    }
    $sql= "delete from cartitems where cartitemId = '".$cartitemid."'";
    $conn->query($sql)==True;
    $sql2= "select * from cartitems where cart_id = '".$cart_id."'";
    $cart = $conn->query($sql2)==True;
    if($cart->num_rows == 0){
        $sq3= "delete from cart where cart_id = '".$cart_id."'";
        if($conn->query($sq3)==True){
            $response = [
                'message' => "Order Removed",
            ];
        }
    }
    
    
    echo json_encode($response);

}
?>
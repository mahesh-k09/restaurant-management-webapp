<?php  include 'dbConn.php'?>
<?php 
require 'vendor/autoload.php';
use Firebase\JWT\JWT; 
use Firebase\JWT\Key;
?>
<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);
$quantity = $input['quantity'];
$food_id = $input['food_id'];
$price = $input['price'];
$headers = getallheaders();
// Get the token from the Authorization header
if (isset($headers['Authorization'])) {
    // Get the token from the Authorization header
    $authHeader = $headers['Authorization'];
    // Typically, the token is sent in the format "Bearer <token>"
    list($type, $token) = explode(" ", $authHeader, 2);
    if ($type === 'Bearer') {
        // Now you have the token in $token
        $secretKey = 'restaruant'; 
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
        
        $customer_id = $decoded->userId;
        $sql = "select * from cart where customer_id='".$customer_id."' and status='Cart'";
        $cart_count = $conn->query($sql);
        if($cart_count->num_rows == 0){
            $sql2 = "insert into cart(customer_id,status) values('".$customer_id."','Cart')";
            if($conn->query($sql2)==True){
                $cart_id = $conn->insert_id;

            }
        }else{
            foreach($cart_count as $cart){
                $cart_id = $cart['cart_id'];
            }
        }
        $sql3 = "select * from cartitems where food_id='".$food_id."' and cart_id='".$cart_id."'";
        $cart_item = $conn->query($sql3);
        $update_price = "select * from cart where cart_id='".$cart_id."'";

        $customer_cart = $conn->query($update_price);
        foreach($customer_cart as $c){
            $in_totalPrice = $c['totalPrice'];
            $in_totalPrice = $in_totalPrice+$quantity*$price;
            $sql_price = "update cart set totalPrice='".$in_totalPrice."' where cart_id='".$cart_id."'";
            $conn->query($sql_price);
        } 
        
        if($cart_item->num_rows == 0){
            $sql4 = "insert into cartitems(food_id,cart_id,quantity) values('".$food_id."','".$cart_id."','".$quantity."')";
            if($conn->query($sql4)==True){
                $response = [
                    'message' => "Food Added To Cart",
                ];
            }

        }else{
            foreach($cart_item as $item){
                $result_quantity = $item['quantity']+$quantity;
                $sql5 = "update cartitems set quantity='".$result_quantity."' where food_id='".$food_id."' and cart_id='".$cart_id."'";
                if($conn->query($sql5)==True){
                    $response = [
                        'message' => "Cart Updated",
                    ];
                }

            }
        }
        echo json_encode($response);


        

    } else {
        
    }
} else {
   
}



?>
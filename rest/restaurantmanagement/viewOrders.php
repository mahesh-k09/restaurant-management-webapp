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
$headers = getallheaders();
$input = json_decode(file_get_contents("php://input"), true);
$role = $input['role'];
// Get the token from the Authorization header
if (isset($headers['Authorization'])) {
    // Get the token from the Authorization header
    $authHeader = $headers['Authorization'];
    // Typically, the token is sent in the format "Bearer <token>"
    list($type, $token) = explode(" ", $authHeader, 2);
    if ($type === 'Bearer') {
        if($role=='customer'){
            // Now you have the token in $token
        $secretKey = 'restaruant'; 
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
        
        $customer_id = $decoded->userId;
        $sql = "select cart.cart_id,cart.customer_id,cart.date,customers.name,cart.status,cart.totalPrice,cart.orderType,cartitems.cartitemId,cartitems.food_id,cartitems.quantity,food.food_title,food.price FROM 
            cart
             JOIN 
    customers ON cart.customer_id = customers.customer_id
        LEFT JOIN 
            cartitems ON cart.cart_id = cartitems.cart_id
            LEFT JOIN 
    food ON cartitems.food_id = food.food_id
        WHERE 
            cart.customer_id ='".$customer_id."' and (cart.status='Ordered' or cart.status='Accepted' or cart.status='Dispatched' or cart.status='Preparing' or cart.status='Order Ready' or  cart.status='Order Picked')";
        $result = $conn->query($sql);

        $results = [];

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                 if (!isset($results[$row['cart_id']])) {
                        $results[$row['cart_id']] = [
                            'cart_id' => $row['cart_id'],
                            'customer_id' => $row['customer_id'],
                            'status' => $row['status'],
                            'date' =>$row['date'],
                            'customer_name' =>$row['name'],
                            'totalPrice'=>$row['totalPrice'],
                            'orderType' =>$row['orderType'],
                            'items' => []
                        ];
                    }
                   
                    if ($row['cartitemId'] !== null) { // Avoid adding null items if using LEFT JOIN
                        $results[$row['cart_id']]['items'][] = [
                            'cartitemId' => $row['cartitemId'],
                            'food_id' => $row['food_id'],
                            'quantity' => $row['quantity'],
                            'food_price' =>$row['price'],
                            'food_title' =>$row['food_title']
                            
                        ];
                    }

            }
        } else {
            // If no data found, send an empty array
        }
        

  
        echo json_encode(array_values($results));
       
        }else if($role=='manager'){
            $secretKey = 'restaruant'; 
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            
            $customer_id = $decoded->userId;
            $sql = "select cart.cart_id,cart.customer_id,cart.date,customers.name,cart.status,cart.totalPrice,cart.orderType,cartitems.cartitemId,cartitems.food_id,cartitems.quantity,food.food_title,food.price FROM 
                cart
                JOIN 
    customers ON cart.customer_id = customers.customer_id
            LEFT JOIN 
                cartitems ON cart.cart_id = cartitems.cart_id
                LEFT JOIN 
        food ON cartitems.food_id = food.food_id
            WHERE 
                 (cart.status='Ordered' or cart.status='Dispatched' or cart.status='Accepted' or cart.status='Preparing' or cart.status='Order Ready' or cart.status='Order Picked')";
            $result = $conn->query($sql);
    
            $results = [];
    
            if ($result && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                     if (!isset($results[$row['cart_id']])) {
                            $results[$row['cart_id']] = [
                                'cart_id' => $row['cart_id'],
                                'customer_id' => $row['customer_id'],
                                'status' => $row['status'],
                                'date' =>$row['date'],
                                'customer_name' =>$row['name'],
                                'totalPrice'=>$row['totalPrice'],
                                'orderType' =>$row['orderType'],
                                'items' => []
                            ];
                        }
                       
                        if ($row['cartitemId'] !== null) { // Avoid adding null items if using LEFT JOIN
                            $results[$row['cart_id']]['items'][] = [
                                'cartitemId' => $row['cartitemId'],
                                'food_id' => $row['food_id'],
                                'quantity' => $row['quantity'],
                                'food_price' =>$row['price'],
                                'food_title' =>$row['food_title']
                                
                            ];
                        }
    
                }
            } else {
                // If no data found, send an empty array
            }
            
    
      
            echo json_encode(array_values($results));
           
        }
        
        
       
        

    } else {
        
    }

} else {
   
}


?>
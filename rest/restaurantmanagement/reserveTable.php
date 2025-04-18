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
        $input = json_decode(file_get_contents("php://input"), true);
        $reservation_time = $input['reservation_time'];
        $price = $input['price'];
        $table_id = $input['table_id'];
        $start_time = $input['reservation_time'];
        $end_time = new DateTime($start_time); // specific date and time
        $end_time->modify('+3 hours');
        $end_time = $end_time->format('Y-m-d H:i:s');
        $reservation_time = new DateTime($reservation_time);
        $reservation_time = $reservation_time->format('Y-m-d H:i:s'); //
        $sql = "select * FROM reservations WHERE table_id = '".$table_id."' and status='Reserved' AND start_time < '".$end_time."' AND end_time > '".$reservation_time."' ";
        file_put_contents("php://stderr", "Received data: " . print_r($sql, true) . "\n");
        $reservations = $conn->query($sql);
        if($reservations->num_rows > 0){
            $response = [
                'message' => "Table Reserved In These Timings",
            ];
            file_put_contents("php://stderr", "Received data: " . print_r($response, true) . "\n");

        }else{
            $sql3 = "insert into reservations(table_id,end_time,reservation_time,status,customer_id,start_time,duration) values('".$table_id."','".$end_time."','".$reservation_time."','Reserved','".$customer_id."','".$reservation_time."','5')";
            file_put_contents("php://stderr", "Received data: " . print_r("nnn", true) . "\n");
            if($conn->query($sql3)==True){
                $reserv_id = $conn->insert_id;
                $sql4 = "insert into payments(amount,status,reservation_id) values('".$price."','Amount Paid','".$reserv_id."')";
                if($conn->query($sql4)==True){
                    $response = [
                        'message' => "Table Reserved",
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
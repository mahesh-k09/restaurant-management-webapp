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
$seating_capacity = $input['seating_capacity'];
$location = $input['location'];
$table_number = $input['table_number'];
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
        
        $manager_id = $decoded->userId;
        if($table_number!=""){
            $sql= "select * from tables where table_number = '".$table_number."'";
            $table = $conn->query($sql);
            if($table->num_rows > 0){
                $response = [
                    'message' => "Table EXists",
                ];
            }else{
                $sql2= "insert into tables (table_number,location,seating_capacity,status,price,manager_id) values ('".$table_number."','".$location."','".$seating_capacity."','Available','".$price."','".$manager_id."')";
                if($conn->query($sql2)==True){
                    $response = [
                        'message' => "Table Added Successfully",
                    ];
                }else{
                    $response = [
                        'message' => "dfsdfsf",
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
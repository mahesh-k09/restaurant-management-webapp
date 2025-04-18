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
        $sql = "SELECT tables.table_number, tables.location,reservations.start_time,reservations.reservation_id, reservations.status,reservations.end_time, customers.name ,customers.phone, reservations.table_id
            FROM reservations
            INNER JOIN customers ON reservations.customer_id = customers.customer_id
            INNER JOIN tables ON reservations.table_id = tables.table_id
            WHERE customers.customer_id ='".$customer_id."'";
        $result = $conn->query($sql);

        $results = [];

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                 if (!isset($results[$row['reservation_id']])) {
                        $results[$row['reservation_id']] = [
                            'reservation_id' => $row['reservation_id'],
                            'table_number' => $row['table_number'],
                            'location' => $row['location'],
                            'start_time' =>$row['start_time'],
                            'status'=>$row['status'],
                            'end_time' =>$row['end_time'],
                            'name' =>$row['name'],
                            'phone' =>$row['phone'],
                            'table_id' =>$row['table_id'],
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
          
            $sql = "SELECT tables.table_number, tables.location,reservations.start_time,reservations.reservation_id, reservations.status,reservations.end_time, customers.name ,customers.phone, reservations.table_id
            FROM reservations
            INNER JOIN customers ON reservations.customer_id = customers.customer_id
            INNER JOIN tables ON reservations.table_id = tables.table_id";
        $result = $conn->query($sql);

        $results = [];

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                 if (!isset($results[$row['reservation_id']])) {
                        $results[$row['reservation_id']] = [
                            'reservation_id' => $row['reservation_id'],
                            'table_number' => $row['table_number'],
                            'location' => $row['location'],
                            'start_time' =>$row['start_time'],
                            'status'=>$row['status'],
                            'end_time' =>$row['end_time'],
                            'name' =>$row['name'],
                            'phone' =>$row['phone'],
                            'table_id' =>$row['table_id'],
                        ];
                    }
                   

            }
        } else {
            // If no data found, send an empty array
        }
            
    
      
            echo json_encode(array_values($results));
           
        }else if($role=='admin'){
            $secretKey = 'restaruant'; 
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            
            $customer_id = $decoded->userId;
          
            $sql = "SELECT tables.table_number, tables.location,reservations.start_time,reservations.reservation_id, reservations.status,reservations.end_time, customers.name ,customers.phone, reservations.table_id
            FROM reservations
            INNER JOIN customers ON reservations.customer_id = customers.customer_id
            INNER JOIN tables ON reservations.table_id = tables.table_id";
        $result = $conn->query($sql);

        $results = [];

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                 if (!isset($results[$row['reservation_id']])) {
                        $results[$row['reservation_id']] = [
                            'reservation_id' => $row['reservation_id'],
                            'table_number' => $row['table_number'],
                            'location' => $row['location'],
                            'start_time' =>$row['start_time'],
                            'status'=>$row['status'],
                            'end_time' =>$row['end_time'],
                            'name' =>$row['name'],
                            'phone' =>$row['phone'],
                            'table_id' =>$row['table_id'],
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
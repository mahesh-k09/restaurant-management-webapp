<?php  include 'dbConn.php'?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
$input = json_decode(file_get_contents("php://input"), true);
$role = $input['role'];
file_put_contents("php://stderr", "Received data: " . print_r($role, true) . "\n");

if($role=='customer'){
    $sql = "select * from tables";

    $result = $conn->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $data = [];
    
        // Fetch each row as an associative array and add it to $data
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
    
        }
    
        // Convert data to JSON and send as a response
        echo json_encode($data);
    } else {
        // If no data found, send an empty array
        echo json_encode([]);
    }
    
}else if($role=='manager'){
    $sql = "select * from tables";

    $result = $conn->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $data = [];
    
        // Fetch each row as an associative array and add it to $data
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
    
        }
    
        // Convert data to JSON and send as a response
        echo json_encode($data);
    } else {
        // If no data found, send an empty array
        echo json_encode([]);
    }
    
}else if($role=='admin'){
    $sql = "select * from tables";
    $result = $conn->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $data = [];
    
        // Fetch each row as an associative array and add it to $data
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
    
        }
    
        // Convert data to JSON and send as a response
        echo json_encode($data);
    } else {
        // If no data found, send an empty array
        echo json_encode([]);
    }
    
}


?>
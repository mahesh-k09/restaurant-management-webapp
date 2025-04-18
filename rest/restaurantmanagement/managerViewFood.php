<?php  include 'dbConn.php'?>
<?php 
require 'vendor/autoload.php';
use Firebase\JWT\JWT; 
use Firebase\JWT\Key;

?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
$encryption_key = getenv('ENCRYPTION_KEY'); // Change this to your key
$method = 'AES-256-CBC'; // Encryption method
$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($method)); // Generate IV
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
        $manager_id = $decoded->userId;
        $sql = "select * from food";
        file_put_contents("php://stderr", "Received data: " . print_r($sql, true) . "\n");

        $result = $conn->query($sql);
        $dataArray = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $dataArray[] = $row;
                // foreach($data as $d){
               
                //     $data[] = $d;
        
                // }
            }
        } else {
            echo json_encode([]);
        }
        foreach ($dataArray as &$item) {
            if (isset($item['image'])) {
                $target_path = "uploads/";  
                
                file_put_contents("php://stderr", "Received data: " . print_r($email, true) . "\n");

                $imageFileName = $item['image']; // Replace with the actual file name or retrieve dynamically
                $imagePath = $target_path . $imageFileName;
                $imageData = file_get_contents($imagePath);
                $base64Image = base64_encode($imageData);
                $imageType = pathinfo($imagePath, PATHINFO_EXTENSION);
                $item['image'] = $base64Image; // Modify as needed
               
                
            }
        }

        
        echo json_encode($dataArray);

    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid authorization type"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Authorization header not found"
    ]);
}
// echo json_encode($dataArray);





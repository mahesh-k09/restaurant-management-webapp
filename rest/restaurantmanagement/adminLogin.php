<?php 
require 'vendor/autoload.php';
use Firebase\JWT\JWT; 
?>

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Log a message to confirm the request was received
$input = json_decode(file_get_contents("php://input"), true);
$userName = $input['userName'];
$password = $input['password'];
if($userName=='admin' && $password =='admin'){
    $issuedAt = time();
    $secretKey = 'restaruant';  // Replace with a secure secret key
    $expirationTime = $issuedAt + 3600;  // 1 hour expiration
    $payload = [
        'userId' => $userName,
        'email' => $password,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    ];
    $jwt = JWT::encode($payload, $secretKey, 'HS256');
    $response = [
        'token' => $jwt,
    ];
}else{
    $response = [
        'message' => 'Invalid Login Details',
    ];  
}

echo json_encode($response);
?>
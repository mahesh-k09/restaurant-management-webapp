<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT; 

$secretKey = 'restaruant';  // Replace with a secure secret key
$issuedAt = time();
$expirationTime = $issuedAt + 3600;  // Token valid for 1 hour
$payload = [
    'userId' => 123,  // Replace with actual user ID
    'iat' => $issuedAt,
    'exp' => $expirationTime
];

$jwt = JWT::encode($payload, $secretKey, 'HS256');

echo json_encode(['token' => $jwt]);
?>
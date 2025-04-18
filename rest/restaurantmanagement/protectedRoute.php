<?php
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;

$secretKey = 'restaruant';
$headers = apache_request_headers();

if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Authorization header not found']);
    exit;
}

$token = str_replace('Bearer ', '', $headers['Authorization']);

try {
    $decoded = JWT::decode($token, $secretKey, ['HS256']);
    echo json_encode(['message' => 'Access granted', 'data' => $decoded]);
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid token']);
}
?>
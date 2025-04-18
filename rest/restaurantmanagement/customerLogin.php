<?php  include 'dbConn.php'?>
<?php 
require 'vendor/autoload.php';
use Firebase\JWT\JWT; 
?>

<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);
$email = $input['email'];
$password = $input['password'];
$sql1= "select * from customers where email = '".$email."' and password='".$password."'";
$customers = $conn->query($sql1);
if($customers->num_rows > 0){
    foreach($customers as $customer){
        $issuedAt = time();
        $secretKey = 'restaruant';  // Replace with a secure secret key
        $expirationTime = $issuedAt + 3600;  // 1 hour expiration
        $payload = [
            'userId' => $customer['customer_id'],
            'email' => $customer['email'],
            'iat' => $issuedAt,
            'exp' => $expirationTime
        ];
        $jwt = JWT::encode($payload, $secretKey, 'HS256');
        $response = [
            'token' => $jwt,
        ];
      
    }
}
else{
    $response = [
        'message' => 'Invalid Login Details',
    ];  
}
echo json_encode($response);

?>
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
$sql1= "select * from managers where email = '".$email."' and password='".$password."'";
$managers = $conn->query($sql1);
if($managers->num_rows > 0){
    foreach($managers as $manager){
        $issuedAt = time();
        $secretKey = 'restaruant';  // Replace with a secure secret key
        $expirationTime = $issuedAt + 3600;  // 1 hour expiration
        $payload = [
            'userId' => $manager['manager_id'],
            'email' => $manager['email'],
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
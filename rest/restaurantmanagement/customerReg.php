<?php  include 'dbConn.php'?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);
$name = $input['name'];
$email = $input['email'];
$phone = $input['phone'];
$password = $input['password'];
$address = $input['address'];
if($email !="" && $phone !=""){
    $sql1= "select * from customers where email = '".$email."' or phone='".$phone."'";
    $customers = $conn->query($sql1);
    file_put_contents("php://stderr", "Received data: " . print_r($email, true) . "\n");
    
     
    if($customers->num_rows > 0){
        $response = [
            'message' => "Duplicate Details",
        ];
    }else {
    
        $sql2= "insert into customers (name,email,phone,password,address) values ('".$name."','".$email."','".$phone."','".$password."','".$address."')";
        file_put_contents("php://stderr", "Received data: " . print_r($sql2, true) . "\n");
    
        if($conn->query($sql2)==True){
            $response = [
                'message' => "Customer Registered Successfully",
            ];
        }else{
            $response = [
                'message' => "dfsdfsf",
            ];
        }
        
    }
    echo json_encode($response);
}


?>
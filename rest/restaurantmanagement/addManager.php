<?php  include 'dbConn.php'?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$input = json_decode(file_get_contents("php://input"), true);
$name = $input['name'];
$email = $input['email'];
$phone = $input['phone'];
$password = $input['password'];
$address = $input['address'];
if($email !="" && $phone !=""){
    $sql1= "select * from managers where email = '".$email."' or phone='".$phone."'";
    $managers = $conn->query($sql1);
    file_put_contents("php://stderr", "Received data: " . print_r($sql1, true) . "\n");

    if($managers->num_rows > 0){
        $response = [
            'message' => "Duplicate Manager Details",
        ];
    }else {
    
        $sql2= "insert into managers (name,email,phone,password,address) values ('".$name."','".$email."','".$phone."','".$password."','".$address."')";
        if($conn->query($sql2)==True){
            $response = [
                'message' => "Manager Added Successfully",
            ];
        }else{
            $response = [
                'message' => "dfsdfsf",
            ];
        }
        
    }
    
}
echo json_encode($response);
?>
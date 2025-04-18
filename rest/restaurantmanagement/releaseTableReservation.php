<?php  include 'dbConn.php'?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$input = json_decode(file_get_contents("php://input"), true);
$reservation_id = $input['reservation_id'];
if($reservation_id!=""){
    $sql= "update reservations set status ='Available' where reservation_id = '".$reservation_id."'";
    if($conn->query($sql)==True){
        $response = [
            'message' => "Table Available",
        ];
    }
    echo json_encode($response);

}
?>
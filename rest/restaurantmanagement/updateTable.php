<?php  include 'dbConn.php'?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
$input = json_decode(file_get_contents("php://input"), true);
$seating_capacity = $input['seating_capacity'];
$location = $input['location'];
$table_number = $input['table_number'];
$price = $input['price'];
$table_id = $input['table_id'];
if($table_id!=""){
    $sql = "update tables set seating_capacity='".$seating_capacity."',location='".$location."',table_number='".$table_number."',price='".$price."' where  table_id='".$table_id."'";
    
    file_put_contents("php://stderr", "Received data: " . print_r($sql, true) . "\n");
    if($conn->query($sql)==True){
        $response = [
            'message' => "Table Updated Successfully",
        ];
    }else{
        $response = [
            'message' => "Fail To Update Table",
        ];
    }
}





?>
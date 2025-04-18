<?php  include 'dbConn.php'?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$input = json_decode(file_get_contents("php://input"), true);
$seating_capacity = $input['seating_capacity'];
$location = $input['location'];
$table_number = $input['table_number'];
$price = $input['price'];
if($table_number!=""){
    $sql= "select * from tables where table_number = '".$table_number."'";
    $table = $conn->query($sql);
    if($table->num_rows > 0){
        $response = [
            'message' => "Table EXists",
        ];
    }else{
        $sql2= "insert into tables (table_number,location,seating_capacity,status,price) values ('".$table_number."','".$location."','".$seating_capacity."','Available','".$price."')";
        if($conn->query($sql2)==True){
            $response = [
                'message' => "Table Added Successfully",
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
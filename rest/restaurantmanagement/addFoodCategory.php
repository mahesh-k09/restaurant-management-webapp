<?php  include 'dbConn.php'?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$input = json_decode(file_get_contents("php://input"), true);
$foodCategoryName = $input['foodCategoryName'];
if($foodCategoryName!=""){
    $sql= "select * from foodcategory where foodCategoryName = '".$foodCategoryName."'";
    $foodCategory = $conn->query($sql);
    if($foodCategory->num_rows > 0){
        $response = [
            'message' => "Duplicate Food Category",
        ];
    }else{
        $sql2= "insert into foodcategory (foodCategoryName) values ('".$foodCategoryName."')";
        file_put_contents("php://stderr", "Received data: " . print_r($sql2, true) . "\n");

        if($conn->query($sql2)==True){
            $response = [
                'message' => "Food Category Added",
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
<?php  include 'dbConn.php'?>
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
$encryption_key = getenv('ENCRYPTION_KEY'); // Change this to your key
$method = 'AES-256-CBC'; // Encryption method
$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($method)); // Generate IV

$sql = "select * from food";

$result = $conn->query($sql);
$dataArray = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $dataArray[] = $row;
        // foreach($data as $d){
       
        //     file_put_contents("php://stderr", "Received data: " . print_r($d['image'], true) . "\n");
        //     $data[] = $d;

        // }
    }
} else {
    // If no data found, send an empty array
    echo json_encode([]);
}
// Modify the data as needed
foreach ($dataArray as &$item) {
    // Example modification: change a field value
    if (isset($item['image'])) {
        $target_path = "uploads/";  
        $imageFileName = $item['image']; // Replace with the actual file name or retrieve dynamically
        $imagePath = $target_path . $imageFileName;
        $imageData = file_get_contents($imagePath);
        // Encode the image data in base64
        $base64Image = base64_encode($imageData);
        $imageType = pathinfo($imagePath, PATHINFO_EXTENSION);
        $item['image'] = $base64Image; // Modify as needed
    }
}
echo json_encode($dataArray);


?>
<?php

$server = "localhost";
$username = "root";
$password = "shema@123";
$db = "facility_manager_db";

$conn = new mysqli($server, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['query'])) {
    $search = $_POST['query'];

    $sql = "SELECT * FROM facilities WHERE logs LIKE '%$search%'";
    $result = $conn->query($sql);

    $data = array(); // Create an array to store results

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row; // Add each row to the data array
        }
        echo json_encode($data); // Return JSON encoded data
    } else {
        echo json_encode(array("message" => "No results found")); // Return JSON with message
    }
}

$conn->close();

?>

<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$server="localhost";
$username="root";
$password="";
$db="facility_manager_db";


$conn = new mysqli($server, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
    
        $result = $conn->query("SELECT * FROM facilities");
        if($result){
            $facilities = array();
            while ($row = $result->fetch_assoc()) {
                $facilities[] = $row;
            }
            echo json_encode($facilities);    
        }else{
            echo json_encode(array('status' => 'error', 'message' => $conn-> error));
        }
        break;

    case 'POST':
        parse_str(file_get_contents("php://input"), $_POST);
        $schedules = $_POST['schedules'];
        $logs = $_POST['logs'];
        $inventory = $_POST['inventory'];

        $stmt = $conn->prepare("INSERT INTO facilities(schedules, logs, inventory) VALUES (?, ?, ?)");
        $stmt -> bind_param("sss", $schedules, $logs, $inventory);

        if($stmt -> execute()){
            echo json_encode(array('status' => 'success'));
        }else {
            echo json_encode(array('status' => 'error', 'message' => $conn->error));
        }

        $stmt->close();
        break;

    case 'PUT':
        parse_str(file_get_contents("php://input"), $_PUT);
        $id = $_PUT['id'];
        $schedules = $_PUT['schedules'];
        $logs = $_PUT['logs'];
        $inventory = $_PUT['inventory'];
        $stmt = $conn->prepare("UPDATE facilities SET schedules=?, logs=?, inventory=? WHERE id=?");
        $stmt -> bind_param("sssi", $schedules, $logs, $inventory, $id);
        $stmt -> execute();
        $stmt -> close();
        echo json_encode(array('status' => 'success'));
        break;

    case 'DELETE':
        
        parse_str(file_get_contents("php://input"), $_DELETE);
        $id = $_DELETE['id'];
        $conn->query("DELETE FROM facilities WHERE id=$id");
        echo json_encode(array('status' => 'success'));
        break;
}
$conn->close();

?>
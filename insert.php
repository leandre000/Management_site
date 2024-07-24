<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "new"; // Change to your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$firstName = $_POST['first-name'];
$lastName = $_POST['last-name'];
$username = $_POST['user'];
$email = $_POST['email'];
$password = $_POST['password'];

// Insert data into the table
$sql = "INSERT INTO activers (firstName,lastName,username,email, password) VALUES ('$firstName','$lastName', '$username', '$email','$password')";
if ($conn->query($sql) === TRUE) {
    echo "Record inserted successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
<?php

$hostName = "localhost";
$dbUser = "music";
$dbPassword = "12345";
$dbName = "music";
$conn = mysqli_connect($hostName, $dbUser, $dbPassword, $dbName);
if (!$conn) {
    die("Something went wrong;");
}

?>
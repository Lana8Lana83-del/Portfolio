<?php

//MySQL - Identifiants

$dbServer="localhost";
$dbUsername="root";
$dbPassword="root";
$dbName="cinema";

//Connection DB

try {
    $conn = new PDO("mysql:host=$dbServer; dbname=dbName", $dbUsername, $dbPassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur:" . $e->getMessage();
}

?>
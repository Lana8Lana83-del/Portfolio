<?php

//Appel de database
include './db.php';

//Requête a notre base de donnée 
$query = "SELECT  FROM movie WHERE title LIKE '$_GET[movieSearch]' ORDER BY title";
$result = $conn->query($query);

//On print les résultats
while ($row = $result->fetch()){
    echo $row['title'] . ' - ' . $row['release_date'] . '<br>' ;
}





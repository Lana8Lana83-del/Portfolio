<?php
$mysqlClient = new PDO(
    'mysql:host=localhost;dbname=partage_de_recettes;charset=utf8',
    'root',
    ''
);


$mysqlClient = new PDO('mysql:host=sql.hebergeur.com;dbname=mabase;charset=utf8', 'pierre.durand', 's3cr3t');



try
{
    $mysqlClient = new PDO('mysql:host=localhost;dbname=partage_de_recettes;charset=utf8', 'root', '');
}
catch (Exception $e)
{
    die('Erreur : ' . $e->getMessage());
}

















?>
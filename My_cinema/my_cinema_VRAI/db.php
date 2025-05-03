<?php
$host = "localhost"; // Serveur MySQL (par défaut, c'est localhost)
$dbname = "cinema"; // Nom de la base de données
$username = "root"; // Identifiant MySQL
$password = "Epitech03"; // Mot de passe MySQL

try {
    // Connexion à la base de données avec PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Configuration des options de PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    echo "Connexion réussie à la base de données !";
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>

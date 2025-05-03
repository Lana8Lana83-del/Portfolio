<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Connexion MySQL</title>
</head>
<body>
    <h1>Connexion à la base de données Cinema</h1>
    <form method="post">
        <label for="dbname">Nom de la base de données :</label>
        <input type="text" id="dbname" name="dbname" value="cinema" required>
        <br><br>
        <label for="username">Nom d'utilisateur :</label>
        <input type="text" id="username" name="username" value="root" required>
        <br><br>
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" value="root" required>
        <br><br>
        <button type="submit" name="connect">Tester la connexion</button>
    </form>

    <?php
    if (isset($_POST['connect'])) {
        $dbname = $_POST['dbname'];
        $username = $_POST['username'];
        $password = $_POST['password'];

        try {
            $mysqlClient = new PDO("mysql:host=localhost;dbname=$dbname;charset=utf8", $username, $password);
            echo "<p style='color: green;'>Connexion réussie à la base de données <strong>$dbname</strong> !</p>";
        } catch (Exception $e) {
            echo "<p style='color: red;'>Erreur : " . $e->getMessage() . "</p>";
        }
    }
    ?>
</body>
</html>

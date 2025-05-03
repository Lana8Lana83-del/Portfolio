

<?php
    $NumberGenre = 0;

    if (isset($_POST["Form1"])) {

         $film = $_POST["Film"];
         $movie2 =  strtolower($film);

         include("./Movie/switchGenre.php");

         if ($_POST["Choose"] == "genre") {
             /*                 SELECT movie.title, movie_genre.id_movie, movie_genre.id_genre  FROM movie  INNER JOIN movie_genre ON movie.id = movie_genre.id_movie  WHERE movie_genre.id_genre = 2;
             */
             $requetteNew = "SELECT movie.title FROM movie  INNER JOIN movie_genre ON movie.id = movie_genre.id_movie  WHERE movie_genre.id_genre = $NumberGenre LIMIT 20";
         } else if ($_POST["Choose"] == "distributor") {
             /*             SELECT movie.id_distributor, movie.title, distributor.name FROM movie INNER JOIN distributor ON movie.id_distributor = distributor.id;
             */
             $requetteNew = "SELECT movie.title FROM movie INNER JOIN distributor ON movie.id_distributor = distributor.id WHERE distributor.name = $film";
         } else if ($_POST["Choose"] == "SansOption") {
             $requetteNew = "SELECT title,duration FROM movie WHERE title LIKE '$film%' LIMIT 20";
         }
     }

     include("./pdo.php");
     $recipesStatement->execute();
     $usersNew = $recipesStatement->fetchAll();
 
?>
 






         <main>
             <?php if ($_POST["Choose"] == "SansOption"): ?>
                 <?php foreach ($usersNew as $key): ?>
                     <div class="AllPagination">
                         <span>Nom du film</span> <br>
                         <?php echo $key[0]; ?><br>
                         <span class="durate">Durée : <?php echo $key[1] . " min"; ?></span>
                     </div>
                     <?php ?>
                 <?php endforeach; ?>
             <?php endif; ?>
 
             <?php if ($_POST["Choose"] == "genre"):  ?>
 
                 <?php foreach ($usersNew as $key): ?>
                     <div class="AllPagination">
                         <span>Nom du film</span> <br>
                         <?php echo $key[0]; ?><br>
                     </div>
                 <?php endforeach; ?>
             <?php endif; ?>
 
 
    
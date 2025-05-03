var playerRed = 'R';
var playerYellow = "Y";
var currPlayer = playerRed;
var gameOver = false;
var board;
var currColumns;
var rows = 6;
var columns = 7;
var moveHistory = [];

//REDIMENSIONNER LE TABLEAU
// Fonction pour redimensionner le plateau
/*
document.getElementById("resizeBoard").addEventListener("click", function() {
    let newRows = parseInt(document.getElementById("rows").value);
    let newColumns = parseInt(document.getElementById("columns").value);
    
    if (newRows >= 4 && newColumns >= 4) { // Minimum pour un Puissance 4
        rows = newRows;
        columns = newColumns;
        setGame();
    } else {
        alert("Le plateau doit avoir au moins 4x4 cases.");
    }
});*/

/*
function setupUI() {
    document.getElementById("applySize").addEventListener("click", function() {
        let newRows = parseInt(document.getElementById("numRows").value);
        let newCols = parseInt(document.getElementById("numCols").value);
        
        if (newRows > 3 && newCols > 3) {
            rows = newRows;
            columns = newCols;
            newGame();
        } else {
            alert("Les valeurs doivent être supérieures à 3.");
        }
    });
    
    document.getElementById("reset").addEventListener("click", resetGame);
    document.getElementById("undo").addEventListener("click", undoMove);
    document.getElementById("newGame").addEventListener("click", newGame);
}*/



//CHARGER LA PAGE
window.onload = function() {
    setGame();
    document.getElementById("reset").addEventListener("click", resetGame);
    document.getElementById("undo").addEventListener("click", undoMove);
    document.getElementById("newGame").addEventListener("click", newGame); 
    loadScores();
    loadGameHistory(); // Charger l'historique des parties
}

//INITIALISER LA PLATEAU
function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    document.getElementById("board").innerHTML = "";

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push('');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}


// gérer l'ajout d'un jeton dans la colonne 
function setPiece() {
    if (gameOver) return;
    let coords = this.id.split("-");
    let c = parseInt(coords[1]);
    let r = currColumns[c];
    if (r < 0) return;

    board[r][c] = currPlayer;
    moveHistory.push({row: r, col: c}); // Stocker le dernier coup

    let tile = document.getElementById(r.toString() + "-" + c.toString());
    tile.classList.add(currPlayer == playerRed ? "red-piece" : "yellow-piece");

    currColumns[c] = r - 1;
    currPlayer = currPlayer == playerRed ? playerYellow : playerRed;
    document.getElementById("currentPlayer").innerText = "Tour de : " + (currPlayer == playerRed ? "Joueur Rouge" : "Joueur Jaune");
    checkWinner();
}



//A QUEL MOMENT ON GAGNE
function checkWinner() {
    // Vérification des lignes
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] && board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Vérification des colonnes
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] && board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Vérification des diagonales (haut-gauche -> bas-droite)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] && board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Vérification des diagonales (haut-droite -> bas-gauche)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 3; c < columns; c++) {
            if (board[r][c] && board[r][c] == board[r+1][c-1] && board[r+1][c-1] == board[r+2][c-2] && board[r+2][c-2] == board[r+3][c-3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Vérification de match nul
    if (!board.flat().includes('')) {
        document.getElementById("winner").innerText = "Partie nulle !";
        gameOver = true;
    }
}


//AFICHER LE GAGNANT
function setWinner(r, c) {
    document.getElementById("winner").innerText = board[r][c] == playerRed ? "Victoire du joueur Rouge !" : "Victoire du joueur Jaune !";
    gameOver = true;
    updateScore(board[r][c]);
    saveGameHistory(board[r][c]); // Sauvegarde l'historique partie
}

//réinitialiser le jeu
function resetGame() {
    gameOver = false;
    document.getElementById("winner").innerText = "";
    setGame();
}


//Fonction pour commencer une nouvelle partie
function newGame() {
    gameOver = false;
    moveHistory = [];
    document.getElementById("winner").innerText = "";
    setGame();
    resetScores(); // Réinitialiser les scores lors d'une nouvelle partie
    clearGameHistory(); // Effacer l'historique des parties
}


//Fonction pour annuler le dernier coup
function undoMove() {
    if (moveHistory.length === 0 || gameOver) return;
    let lastMove = moveHistory.pop();
    board[lastMove.row][lastMove.col] = "";
    document.getElementById(lastMove.row + "-" + lastMove.col).classList.remove("red-piece", "yellow-piece");
    currColumns[lastMove.col] = lastMove.row;
    currPlayer = currPlayer == playerRed ? playerYellow : playerRed;
    document.getElementById("currentPlayer").innerText = "Tour de : " + (currPlayer == playerRed ? "Joueur Rouge" : "Joueur Jaune");
}


// Fonction pour mettre à jour les scores
function updateScore(winner) {
    let scoreId = winner == playerRed ? "scoreRed" : "scoreYellow";
    let newScore = parseInt(document.getElementById(scoreId).innerText) + 1;
    document.getElementById(scoreId).innerText = newScore;
    localStorage.setItem(scoreId, newScore);
}


//// Fonction pour réinitialiser les scores
function resetScores() {
    // Réinitialise les scores et les sauvegarde
    localStorage.setItem("scoreRed", 0);
    localStorage.setItem("scoreYellow", 0);
    document.getElementById("scoreRed").innerText = 0;
    document.getElementById("scoreYellow").innerText = 0;
}



//Fonction pour charger les scores depuis le stockage local
function loadScores() {
    // Récupérer les scores depuis le stockage local
    document.getElementById("scoreRed").innerText = localStorage.getItem("scoreRed") || 0;
    document.getElementById("scoreYellow").innerText = localStorage.getItem("scoreYellow") || 0;
}










//HISTORIQUE DES PARTIES
// Fonction pour sauvegarder l'historique des parties
// Fonction pour sauvegarder l'historique des parties
function saveGameHistory(winner) {
    // Récupère l'historique des parties depuis le localStorage
    // JSON.parse(...) convertit la chaîne stockée en tableau JavaScript.
    // Si aucune donnée n'est trouvée, un tableau vide "[]" est utilisé.
    let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];

    // Détermine quel joueur a gagné (Rouge ou Jaune)
    let result = winner == playerRed ? "Rouge" : "Jaune";

    // Ajoute le gagnant à la liste des parties
    gameHistory.push(result);

    // Sauvegarde la nouvelle liste dans le localStorage sous forme de chaîne JSON
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));

    // Recharge l'affichage de l'historique des parties pour mettre à jour l'interface utilisateur
    loadGameHistory();
}


// Fonction pour charger l'historique des parties
function loadGameHistory() {
    let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
    let gameHistoryList = document.getElementById("gameHistory");
    gameHistoryList.innerHTML = "";
    gameHistory.forEach(function(game, index) {
        let listItem = document.createElement("li");
        listItem.textContent = "Partie " + (index + 1) + " : " + game + " gagné";
        gameHistoryList.appendChild(listItem);
    });
}


// Fonction pour effacer l'historique des parties
function clearGameHistory() {
    localStorage.removeItem("gameHistory");
    loadGameHistory();
}

/*Implémentez un chargement asynchrone du fichier questions.json en utilisant fetch et les
Promises ou async/await*/
async function loadQuestionsData() {
    const response = await fetch('document.json'); 
    const questionsData = await response.json(); // convertit la réponse en format JSON
    return questionsData; 
}


let questionIndex = 0; 
let currentScore = 0; 
let questionsData = []; 
let timer; 
let savedScores = JSON.parse(localStorage.getItem("quizScores")) || []; 



//  On initialise le quiz,lors du chargement du DOM
document.addEventListener("DOMContentLoaded", async () => {
    questionsData = await loadQuestionsData(); 
    displayQuestion(); 
    updateScoreboard(); 
});




// Afficher question + réponses
function displayQuestion() {
    if (questionIndex >= questionsData.length) {
        showFinalScore(); 
        return; 
    }
    
    // éléments HTML où on va afficher la question et les réponses
    const questionContainer = document.getElementById("question-section");
    const status = document.getElementById("status");
    const currentQuestion = questionsData[questionIndex]; 

    questionContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <ul>
            ${currentQuestion.reponses.map((rep, index) => 
                `<li><button onclick="checkAnswer(${index + 1})">${rep}</button></li>`
            ).join('')}
        </ul>
        <p id="timer">Temps restant : 10s</p>
    `;
    
    status.textContent = `Question ${questionIndex + 1} / ${questionsData.length}`;
    startTimer(); 
}


// Mode Nuit (bonus imagine mais ne fonctionne pas)
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});


// Qd l'utilisateur choisit une réponse
function checkAnswer(selectedAnswer) {
    clearInterval(timer); 
    if (selectedAnswer == questionsData[questionIndex].solution) {
        currentScore++; // Si correcte, on augmente le score
    } else {
        showPopup("Mauvaise réponse !"); 
    }
    
    questionIndex++; 
    displayQuestion(); 
}


// Afficher le score final à la fin du quiz (bonus imagine)
function showFinalScore() {
    document.getElementById("question-section").innerHTML = `
        <h2>Quiz terminé !</h2>
        <p>Votre score : ${currentScore} / ${questionsData.length}</p>
        <button onclick="restartQuiz()">Recommencer</button>
    `;

    savedScores.push(currentScore); 
    localStorage.setItem("quizScores", JSON.stringify(savedScores)); 
    updateScoreboard();    
}

// fonction message suivant le scorefinal (test)
function messageScore(){
    if (currentScore < 10) {
        alert("Bien jouer");
    } else {
        alert("A revoir");
    }
}


// fonction message suivant le scorefinal (test)
function messageScore(){
    if (currentScore < 10) {
        alert("Bien jouer");
    } else {
        alert("A revoir");
    }
}


// Recommencer le quiz (bonus imagine)
function restartQuiz() {
    questionIndex = 0; // Réinitialise l'indice de la question
    currentScore = 0; // Réinitialise le score
    displayQuestion(); // Affiche la première question à nouveau
}


// Afficher un pop-up 
function showPopup(message) {
    const popup = document.createElement("div"); 
    popup.classList.add("popup");
    popup.textContent = message; 
    document.body.appendChild(popup); 

    // On supprime le pop-up après 2 secondes
    setTimeout(() => {
        popup.remove();
    }, 2000);
}


// Démarrer le timer pour chaque question
function startTimer() {
    let timeLeft = 10; 
    const timerElement = document.getElementById("timer"); 
    timer = setInterval(() => {
        timeLeft--; 
        timerElement.textContent = `Temps restant : ${timeLeft}s`; 
        
        if (timeLeft === 0) { 
            clearInterval(timer); 
            checkAnswer(-1); 
        }
    }, 1000); //  On met a jour toutes les secondes
}



// Mettre à jour le tableau des scores
function updateScoreboard() {
    const scoreboard = document.getElementById("scoreboard"); 
    scoreboard.innerHTML = "<h3>Tableau des scores :</h3>" + savedScores.map((score, index) => 
        `<p>Partie ${index + 1}: ${score} points</p>` 
    ).join('');
}

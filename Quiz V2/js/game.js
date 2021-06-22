const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const scoreText = document.getElementById('score');
//VARS// 

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var questionIndex = 0;

// HARD CODED VRAGEN//
var questions = [];

fetch("js/questions.json")
    .then(response => {
        return response.json()
    })
    .then(loadedQuestions => {

        questions = loadedQuestions;
        startGame();

    });

// Consts

const correct_bonus = 10; // Dit is de waarde van de score die toegevoegd zal worden
const max_questions = 3; // Maximale aantal vragen

// Function om het spel op te starten, zet de variabelen op 0.  // 
function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    renderQuestion();
}

// Maakt de vragen

function renderQuestion() {
    if (availableQuestions.length == 0 || questionCounter >= max_questions) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/end.html"); // Stuurt de gebruiker naar het highscore scherm als alle vragen zijn beantwoord
    } // Wanneer er geen vragen meer zijn wordt de gebruiker gestuurd naar het eindscherm. 
    questionCounter++; // Telt welke vraag er nu is. 
    progressText.innerText = `Question ` + questionCounter + "/" + max_questions;

    // update progressBar

    progressBarFull.style.width = (questionCounter / max_questions) * 100 + `%`;
    currentQuestion = availableQuestions[questionIndex]; // Houd bij welke vraag hierna komt. 
    question.innerText = currentQuestion.question; // Pakt de tekst van de huidige vraag uit de js. 

    choices.forEach(choice => {
        const number = choice.dataset['number']; // Pakt het bijbehorende nummer bij de vraag. 
        choice.innerText = currentQuestion["choice" + number]; // Zelfde bij de question. 
    });

    // acceptingAnswers = true;

};



choices.forEach(choice => {
    choice.addEventListener("click", event => {


        // if (!acceptingAnswers) return;

        // acceptingAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        var classToApply = 'incorrect' // Als current.question.answer niet gelijk is aan selectedanswer zal dit altijd incorrect zijn. 
        var check = currentQuestion.answer.includes(selectedAnswer);

        if (check) {
            classToApply = 'correct'
            scoreCounter(correct_bonus); // Als het antwoord goed is dan wordt de class correct toegevoegd. 
        }
        console.log(classToApply); // Testen

       selectedChoice.parentElement.classList.add(classToApply);
       //document.getElementsByClassName("choice-text").classList.add(classToApply);

        // SetTimeOut staat ervoor dat de class verwijderd wordt van de container en de volgende vraag wordt ingeladen. 

      //  setTimeout(() => {
      //     selectedChoice.parentElement.classList.remove(classToApply); // Verwijderd de incorrect of correct class. 
        //    questionIndex++; // Volgende vraag in de array
         //   renderQuestion();
        //}, 500);
    });
});

function scoreCounter(number) {
    score += number;
    scoreText.innerText = score; // Functie om te score op te tellen
};
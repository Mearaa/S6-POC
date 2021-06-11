const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
//VARS// 

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0; 
var availableQuestions = [];
var questionIndex = 0;

// HARD CODED VRAGEN//
var questions = [{
    question: "Ik heb al enige tijd last van trage en wegvallende wifi. Weten jullie waardoor dit komt?",
    choice1: "Ik ga u hiervoor doorverbinden",
    choice2: "Heeft u dit ook bedraad?",
    choice3: "Wat voor apparaten heeft u aangesloten?",
    choice4: "Geen idee",
    answer: "2", 
},
{
    question: "Ik heb inderdaad een pinapparaat bekabeld staan. Wat kan ik nu als beste doen om ervoor te zorgen dat mijn wifi verbinding weer goed is?",
    choice1: "Adviseer de klant de wifi manager te doorlopen",
    choice2: "Laat de klant het pinapparaat ontkoppelen",
    choice3: "Geef het modem een harde reset",
    choice4: "Raad de klant een monteur aan",
    answer: "2",
},
 {
    question: "Oh huh!? Mijn wifi snelheid schiet ineens omhoog, wat geweldig! Wat kan ik doen om dit probleem weer te voorkomen?",
    choice1: "Adviseer de klant contact op te nemen met leverancier van het pinapparaat.",
    choice2: "Vertel de klant dat ze hiervoor altijd moet bellen.",
    choice3: "Geef geen advies, dit is vertrouwelijke informatie.",
    choice4: "Adviseer de klant het pinapparaat te vervangen.",
    answer: "1",
}];

// Consts

const correct_bonus = 10;
const max_questions = 3;

// Function om het spel op te starten, zet de variabelen op 0.  // 
function startGame(){
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    renderQuestion();
}

function renderQuestion() {
    if(availableQuestions.length == 0 || questionCounter >= max_questions){
        return window.location.assign("/end.html");
    } // Wanneer er geen vragen meer zijn wordt de gebruiker gestuurd naar het eindscherm. 
   questionCounter++; // Telt welke vraag er nu is. 
   questionCounterText.innerText = questionCounter + "/" + max_questions;
   currentQuestion = availableQuestions[questionIndex]; // Houd bij welke vraag hierna komt. 
   question.innerText = currentQuestion.question;   // Pakt de tekst van de huidige vraag uit de js. 

   choices.forEach(choice => {
       const number = choice.dataset ['number']; // Pakt het bijbehorende nummer bij de vraag. 
       choice.innerText = currentQuestion["choice" + number]; // Zelfde bij de question. 
   });

  // acceptingAnswers = true;

};



choices.forEach(choice =>{
    choice.addEventListener("click", event =>{
       // if (!acceptingAnswers) return;

       // acceptingAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        var classToApply = 'incorrect'  // Als current.question.answer niet gelijk is aan selectedanswer zal dit altijd incorrect zijn. 
        if (selectedAnswer == currentQuestion.answer){
            classToApply = 'correct' // Als het antwoord goed is dan wordt de class correct toegevoegd. 
       }
       console.log(classToApply); // Testen

       if(classToApply === "correct"){
           scoreCounter(correct_bonus);
       }

       selectedChoice.parentElement.classList.add(classToApply); // Voegt de class .correct of .incorrect toe aan de choice-container.

// SetTimeOut staat ervoor dat de class verwijderd wordt van de container en de volgende vraag wordt ingeladen. 

       setTimeout(( )=>{
        selectedChoice.parentElement.classList.remove(classToApply); // Verwijderd de incorrect of correct class. 
        questionIndex ++; // Volgende vraag in de array
        renderQuestion(); 


       }, 500);
      
    });
});
function scoreCounter(number){
    score += number;
    scoreText.innerText = score; // Functie om te score op te tellen
};

startGame();
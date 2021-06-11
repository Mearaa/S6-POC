// Selects the elements from the HTML

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const questionImage = document.getElementById("questionImage");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// Vragen

var questions = [{
        question: "Dit is een testvraag",
        imgSrc: "img/test.png",
        choiceA: "Antwoord A",
        choiceB: "Antwoord B",
        choiceC: "Antwoord C",
        choiceD: "Antwoord D",
        correct: "B",
    },
    {
        question: "Dit is een testvraag2",
        imgSrc: "img/test.png",
        choiceA: "Antwoord A",
        choiceB: "Antwoord B",
        choiceC: "Antwoord C",
        choiceD: "Antwoord D",
        correct: "C",
    },
    {
        question: "Dit is een testvraag3",
        imgSrc: "img/test.png",
        choiceA: "Antwoord A",
        choiceB: "Antwoord B",
        choiceC: "Antwoord C",
        choiceD: "Antwoord D",
        correct: "D",
    }, {
        question: "Dit is een testvraag4",
        imgSrc: "img/test.png",
        choiceA: "Antwoord A",
        choiceB: "Antwoord B",
        choiceC: "Antwoord C",
        choiceD: "Antwoord D",
        correct: "A",
    },{
        question: "Dit is een testvraag5",
        imgSrc: "img/test.png",
        choiceA: "Antwoord A",
        choiceB: "Antwoord B",
        choiceC: "Antwoord C",
        choiceD: "Antwoord D",
        correct: "A",
    }
];

// Questions function const + var
const lastQuestion = questions.length - 1; // Array -1
var runningQuestion = 0; // Start on 0
/////

// Render const + var
var count = 0;
const questionTime = 10;
const gaugeWidth = 150; //
const gaugeUnit = gaugeWidth / questionTime;
//////

// Timer var
var timer;
var score = 0;
// Adds an eventlistener for when the start training is clicked. After the click the function startQuiz is started. 
start.addEventListener("click", startQuiz);

//////////////////////////////////////////////FUNCTIONS////////////////////////////////////////

// Start Quiz
function startQuiz() {

    start.style.display = "none"; //Removes start button
    renderQuestion(); // Render the questions
    quiz.style.display = "block"; // Displays the quiz
    renderProgress();
    renderCounter();
    timer = setInterval(renderCounter, 1000); //1s
    var score = 0;
}

// Function for the rendering of the questions itself + the choices
function renderQuestion() {
    var q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>"; // Writes out the question in paragraphh style
    questionImage.innerHTML = "<img src =" + q.imgSrc + ">"; // Gets the image associated with that question
    choiceA.innerHTML = q.choiceA; // Different choices
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}
// Progress bar
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class = 'prog' id=" + qIndex + "> </div>";
    }
}

// Function to render the time limit
function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px"; //PX has to be added in order to show the bar progressing.
        count++
    } else {
        count = 0;
        answerisWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            clearInterval(timer);
            scoreRender();
        }
    }
}

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        score++;
        answerIsCorrect();
    } else {
        answerisWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // ends the quiz
        clearInterval(timer);
        scoreRender();
    }
}

function scoreRender() {
    scoreDiv.style.display = "block";
    const scorePercent = Math.round(100 * score / questions.length);
    var img = (scorePercent >= 80) ? "img/5.png" :
        (scorePercent >= 60) ? "img/4.png" :
        (scorePercent >= 40) ? "img/3.png" :
        (scorePercent >= 20) ? "img/2.png" :
        "img/1.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePercent + "%</p>";
}

function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerisWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00"
}
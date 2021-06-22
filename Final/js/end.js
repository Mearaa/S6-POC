const username = document.getElementById('username');
const scoreBtn = document.getElementById('scoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const maxHighScores = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', function () {
  scoreBtn.disabled = !username.value; // Als er niks in het inputveld username staat dan kan er ook niet op submit gedrukt worden. 
});

function highScore(e) {
  e.preventDefault(); // Zorgt ervoor dat het form niet de tags veranderd.

  const score = {
    score: mostRecentScore,
    name: username.value
  };
  highScores.push(score); // .push zorgt ervoor dat er waardes aan een array worden toegevoegd. 

  highScores.sort((a, b) => b.score - a.score); // Sorteert het op decreasing score. 
  highScores.splice(5); // Laat alleen de top 5 resultaten van de array zien dankzij bovenstaande regel en door gebruik te maken van splice op 5 resultaten. 

  localStorage.setItem('highScores', JSON.stringify(highScores)); // Gebruikt stringify om er een string van te maken
  window.location.assign("index.html"); // Stuurt de gebruiker terug naar het home scherm nadat de save knop is ingedrukt.
};
const scoreList = document.getElementById('scoreList');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Voor iedere score die wordt toegevoegd word er een <li> element aangemaakt waar de score.name en de score.score te zien is. Daar wordt de CSS vervolgens aan toegevoegd. 
 highScores.forEach(score => {
    const listItem = document.createElement('li');
    listItem.innerText = `${score.name} - ${score.score}`;
    listItem.classList.add('high-score');
    scoreList.appendChild(listItem);
   })


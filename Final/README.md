# S6 Fidens 

Dit is een project om de trainingen van klantenservicemedewerkers te verbeteren. 
## Installatie

Download de repository van GIT, er is geen npm install nodig. 


## Gebruik
Zet de bestanden naar een server naar keuze bijvoorbeeld Mamp, Wamp, filezilla etc.

## SCSS
In dit project wordt gebruikt gemaakt van SCSS om een template te creëren. Zo staat er in de _config een aantal variabelen(vanaf regel 1 t'm 5): 

```scss
$primary-color: #01C302;
$secondary-color: #48B4FC;
$light-color: #f4f4f4;
$dark-color:#333333;

```

De kleuren die nu gebruikt zijn, zijn de kleuren van KPN maar deze zijn natuurlijk aan te passen naar de gewenste huisstijl kleuren. De light & dark color worden gebruikt om een light en dark mode te creëren. Als de achtergrond kleur de dark-color is dan wordt de tekst kleur aangepast naar een lichte kleur en visa versa. 
Hierbij wordt de volgende functie gebruikt(vanaf regel 24 t'm 37): 
```scss
@function set-text-color($color) {
    @if(lightness($color) > 50) {
        @return #333;
    }

    @else {
        @return #fff;
    }
}

@mixin set-background($color) {
    background-color: $color;
    color: set-text-color($color);
}
```

Er is ook een standaard hoverstyle gedefineerd. Deze kan aangepast worden in de _config (vanaf regel 14). Met deze hover wordt de border wat lichter en de button zelf wat groter om feedback te geven aan de speler dat erop gedrukt kan worden. 

```scss
@mixin hoverStyle {
    &:hover {
        border: 0.1rem solid $light-color;
        cursor: pointer;
        transform: translateY(-0.3rem);
        transition: transform 150ms;
    }
}
```

Deze mixin kan gemakkelijk gebruikt worden door onderstaande regel in de class of id toe te voegen. 
```scss
@include hoverstyle();
```` 

## game.js

In dit javascript bestand worden de meeste functies voor een werkend spel gedefineerd. Vanaf regel 1 tm 13 worden de consts en vars gedefineerd. **_Let op:_** Hou er rekening mee dat als je de class of Id namen in de HTML aanpast dat je dit ook doet in de javascript consts. 

Vanaf regel 16 worden de vragen ingeladen door middel van een fetch en het .json bestand questions.json. 

```javascript
fetch("js/questions.json")
    .then(response => {
        return response.json()
    })
    .then(loadedQuestions => {

        questions = loadedQuestions;
        startGame();

    });

```

**_Let op_** Als er extra vragen toegevoegd worden moet de const max_questions op regel 32 aangepast worden naar het aantal vragen.

De score telling wordt nu gedaan met +10. Als dit hoger of lager gezet moet worden dan kan de waarde van de volgende regel(31) aangepast worden:

```javascript
const correct_bonus = 10;
```

Vanaf regel 35 t'm 41 is de startGame functie gemaakt. Dit zet alle variabelen op 0 en het de vragen worden ingeladen. 

De functie renderquestion begint met het bijhouden wanneer de training voorbij is(wanneer de vragen op zijn), pakt vervolgens de score van de speler en voegt dit toe aan de localstorage. 

```javascript
if (availableQuestions.length == 0 || questionCounter >= max_questions) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/end.html");
    }
```
Het onderstaande wordt gebruikt om ervoor te zorgen dat de vragen vanuit de json gekoppeld worden aan de html. Dit geld ook voor de antwoorden. 

```javascript
currentQuestion = availableQuestions[questionIndex]; 
    question.innerText = currentQuestion.question; 

    choices.forEach(choice => {
        const number = choice.dataset['number']; 
        choice.innerText = currentQuestion["choice" + number]; 
```

Vanaf regel 67 wordt er gekeken naar of een antwoord goed is en hoe dit teruggekoppeld wordt aan de gebruiker. 
Dit wordt gedaan door een class toe te voegen aan het correcte of incorrecte antwoord. Nadat een antwoord is gegeven door een gebuiker wordt er een kleine timeout ingesteld zodat de feedback goed te zien is voor de gebruiker. 
```javascript
choices.forEach(choice => {
    choice.addEventListener("click", event => {

        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        var classToApply = 'incorrect'
var check = currentQuestion.answer.includes(selectedAnswer);

        if (check) {
            classToApply = 'correct'
            scoreCounter(correct_bonus);
 selectedChoice.parentElement.classList.add(classToApply);

  setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
questionIndex++
renderQuestion();
}, 500);
    });
});

```

## end.js

End.js wordt gebruikt voor het eindscherm van de training. Net zoals bij game.js worden eerst consts gedefineerd waarbij gebruik gemaakt wordt van de document.getElementById om de id's van de html over te nemen. 
Hier zijn twee andere consts gebruikt ten opzichte van de game.js namelijk de const waarbij de score uit de local storage wordt gehaald
```javascript
const mostRecentScore = localStorage.getItem('mostRecentScore');
```
En de const highscores waarbij de highscores via json.parse doorgegeven worden aan een array. Daarbij wordt een lege array meegegeven als er niks in de local storage staat om errors te voorkomen.

```javascript
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
```

In de functie highScore worden verschillende dingen gebruikt. Zo wordt onderstaande regel gebruikt om ervoor te zorgen dat bij het invullen van het formulier + verzenden dat de tag in de url niet veranderd

```javascript
e.preventDefault();
```

Verder wordt er bepaald dat er in de score de naam van de gebruiker staat en de score van de gebruiker. Deze score wordt op de highscore pagina gesorteerd op aflopend. Verder wordt is er een maximale weergave van 5 highscores in totaal. 

```javascript
const score = {
    score: mostRecentScore,
    name: username.value
  };
  highScores.push(score);

highScores.sort((a, b) => b.score - a.score);
highScores.splice(5);

localStorage.setItem('highScores', JSON.stringify(highScores));
 window.location.assign("index.html");
```

## highscore.js
Om de highscores ook te kunnen laten zien op de highscore pagina wordt er gebruik gemaakt van een functie waarbij <li> elementen wordt toegevoegd waarin de gebruikers naam en score staat. Vervolgens wordt de class high-score toegevoegd voor de styling. 

```javascript
 highScores.forEach(score => {
    const listItem = document.createElement('li');
    listItem.innerText = `${score.name} - ${score.score}`;
    listItem.classList.add('high-score');
    scoreList.appendChild(listItem);
   })
```

### Einde readme
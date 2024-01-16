import { clearPage } from '../../utils/render';

import { readAllQuestions } from '../../utils/questions';

const main = document.querySelector('main');
const HomePage = () => {
  clearPage();
  view();
};

function view() {
  clearPage();
  const quesions = readAllQuestions();

  for (let i = 0; i < 3; i += 1) {
    afficherQuestion(quesions[getRandomNumber(0, quesions.length)]);
  }
  creatButtonForScore();
 
}

function afficherQuestion(question) {
  main.innerHTML += `<h1>${question.question}</h1>
    <form> 
    <input type="radio" name="proposition" value="${question.answers[0].isCorrect}" id="proposition1">
    <label for="proposition1">${question.answers[0].text}</label><br>
    <input type="radio" name="proposition" value="${question.answers[1].isCorrect}" id="proposition2">
    <label for="proposition1">${question.answers[1].text}</label><br>
    <input type="radio" name="proposition" value="${question.answers[2].isCorrect}" id="proposition2">
    <label for="proposition1">${question.answers[2].text}</label>
    </form>`;
}

function creatButtonForScore(){
  main.innerHTML += `<br> <button id="id_button_calculate_score">Calculate my score</button>`;
  const button = document.querySelector('#id_button_calculate_score');
  button.addEventListener('click',calculateScore)
}

function calculateScore(){
  const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
  const selectedValues = Array.from(radioButtons).map(radioButton => radioButton.value);
  // eslint-disable-next-line no-console
  console.log('Valeurs sélectionnées :', selectedValues);
  let compteurTrue = 0;

  selectedValues.forEach(element => {
    if(element === "true"){
      compteurTrue += 1;
    }
  });
  // eslint-disable-next-line no-console
  console.log(compteurTrue);
  afficherReponse(compteurTrue);
}

function afficherReponse(nbrReponse){
  let text = "";
  if(nbrReponse === 0){
    text = "0 is low ...";
  }
  if(nbrReponse === 1){
    text = "presque la moitier !";
  }
  if(nbrReponse === 2){
    text = "bravo 2 c'est pas mal !";
  }

  if(nbrReponse === 3){
    text = "on a un champion la !";
  }

  clearPage();
  main.innerHTML = `<h1> Your score is ${nbrReponse}/3 ! </h1>
  <h2>${text}</h2>`;
  main.innerHTML += `<button id ="id_button_replay">replay</button>`;
  const buttonReplay = document.querySelector('#id_button_replay');
  buttonReplay.addEventListener('click',view);

}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default HomePage;

const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/questions.json');
const jsonDbPath2 = path.join(__dirname, '/../data/games.json');

const listQuestion = [];
const listeScore = [];

function read3QuestionAvecLevel(level) {
  const questions = parse(jsonDbPath, listQuestion);

  const arrayOfLevel = ['easy', 'medium', 'hard'];

  let threeQuestions;
  let tableValueQuestion;

  if (!level) {
    threeQuestions = selectionnerAleatoirement(questions, 3);
  } else if (arrayOfLevel.includes(level)) {
    tableValueQuestion = questions.filter((question) => question.level === level);
    threeQuestions = selectionnerAleatoirement(tableValueQuestion, 3);
  } else {
    return undefined;
  }

  return threeQuestions;
}

function addScore(username, score) {
  const scores = parse(jsonDbPath2, listeScore);

  if (score < 0 || score > 3) return undefined;

  const creatScore = {
    id: getNextId(),
    username,
    score,
    date: Date.now(),
  };
  scores.push(creatScore);
  serialize(jsonDbPath2, scores);
  return creatScore;
}

function selectionnerAleatoirement(liste, nombre) {
  const randomArray = [];
  const copyGames = [...liste];

  for (let i = 0; i < nombre; i += 1) {
    const indexRandom = Math.floor(Math.random() * copyGames.length);
    const chooseObjet = copyGames.splice(indexRandom, 1)[0];
    randomArray.push(chooseObjet);
  }
  return randomArray;
}

function getNextId() {
  const pizzas = parse(jsonDbPath2, listeScore);
  const lastItemIndex = pizzas?.length !== 0 ? pizzas.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = pizzas[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

module.exports = {
  read3QuestionAvecLevel,
  addScore,
};

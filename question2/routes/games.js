const express = require('express');
const { read3QuestionAvecLevel, addScore } = require('../models/games');
const { authorize, isAdmin } = require('../utils/auths');

const router = express.Router();

router.get('/start', (req, res) => {
  const level = req?.query?.level;

  const questions = read3QuestionAvecLevel(level);

  return res.json(questions);
});

router.post('/', authorize, isAdmin, (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const score = req?.body?.score?.length !== 0 ? req.body.score : undefined;

  if (!username || !score) res.sendStatus(400);

  const createdScore = addScore(username, score);

  if (!createdScore) res.sendStatus(400);
  return res.json(createdScore);
});

module.exports = router;

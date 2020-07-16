const wordGameService = require('../services/wordGameService');

const getWordsForGame = async (req, res) => {
  const { count } = req.query;

  const response = await wordGameService.getWordsForGame({ count });
  res.status(200).send({ response });
};

const updateWordGameResult = async (req, res) => {
  // call service
  const { gameResult } = req.body;
  const response = await wordGameService.writeWordgameResult({gameResult})
  res.status(200).send({ response });
}

module.exports = {
  getWordsForGame,
  updateWordGameResult,
};

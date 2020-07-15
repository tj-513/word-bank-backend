const wordGameService = require('../services/wordGameService');

const getWordsForGame = async (req, res) => {
  const { count } = req.query;

  const response = await wordGameService.getWordsForGame({ count });
  res.status(200).send({ response });
};

module.exports = {
  getWordsForGame,
};

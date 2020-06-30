const { wordsService } = require('../services');

const addWord = async(req, res) => {
  console.log(req.body);
  const response = await wordsService.addWord('word', 'def', 'sample');
  res.status(201).send({ response });
};

const updateWord = async (req, res) => {
  console.log(req.body);
  const response = await wordsService.updateWord('aaa', 'word', 'defin', 'sample');
  res.status(200).send({ response });
};

const getWords = async (req, res) => {
  console.log(req.body);
  const response = await wordsService.getWords();
  res.status(200).send({ response });
};

const deleteWord = async (req, res) => {
  console.log(req.body);
  const response = await wordsService.deleteWord('aa');
  res.status(200).send({ response });
};

module.exports = {
  addWord,
  updateWord,
  getWords,
  deleteWord,
};

const { wordsService } = require('../services');

const addWord = (req, res) => {
  console.log(req.body);
  const response = wordsService.addWord('word', 'def', 'sample');
  res.status(201).send({ response });
};

const updateWord = (req, res) => {
  console.log(req.body);
  const response = wordsService.updateWord('aaa', 'word', 'defin', 'sample');
  res.status(200).send({ response });
};

const getWords = (req, res) => {
  console.log(req.body);
  const response = wordsService.getWords();
  res.status(200).send({ response });
};

const deleteWord = (req, res) => {
  console.log(req.body);
  const response = wordsService.deleteWord('aa');
  res.status(200).send({ response });
};

module.exports = {
  addWord,
  updateWord,
  getWords,
  deleteWord,
};

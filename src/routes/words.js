const { wordsService } = require('../services');

const addWord = async(req, res) => {
  console.log(req.body);
  const {word, definition, sampleSentence} = req.body;
  const response = await wordsService.addWord(word, definition, sampleSentence);
  res.status(201).send({ response });
};

const updateWord = async (req, res) => {
  const {_id, word, definition, sampleSentence} = req.body;
  const response = await wordsService.updateWord(_id, word, definition, sampleSentence);
  res.status(200).send({ response });
};

const getWords = async (req, res) => {
  const response = await wordsService.getWords();
  res.status(200).send({ response });
};

const deleteWord = async (req, res) => {
  const _id = req.params.id; 
  const response = await wordsService.deleteWord(_id);
  res.status(200).send({ response });
};

module.exports = {
  addWord,
  updateWord,
  getWords,
  deleteWord,
};

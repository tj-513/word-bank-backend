const addWord = (word, definition, sampleSentence) => {
  console.log({ word, definition, sampleSentence });

  // call client functiom here
  return {
    word,
    definition,
    sampleSentence,
    dateCreated: '111',
    dateModified: '123123',
    _id: 'id23434',
  };
};

const getWords = () => {
  // call client functiom here
  return [
    {
      word: 'word',
      definition: 'definition',
      sampleSentence: 'sample sentence',
      dateCreated: '111',
      dateModified: '123123',
      _id: 'id23434',
    },
    {
      word: 'word',
      definition: 'definition',
      sampleSentence: 'sample sentence',
      dateCreated: '111',
      dateModified: '123123',
      _id: 'id23434',
    },
    {
      word: 'word',
      definition: 'definition',
      sampleSentence: 'sample sentence',
      dateCreated: '111',
      dateModified: '123123',
      _id: 'id23434',
    },
  ];
};

const updateWord = (id, word, definition, sampleSentence) => {
  return {
    word: 'word',
    definition: 'definition',
    sampleSentence: 'sample sentence',
    dateCreated: '111',
    dateModified: '123123',
    _id: 'id23434',
  };
};

const deleteWord = (id) => {
    return {message: 'delete success'}
};

module.exports = {
    addWord,
    getWords,
    updateWord,
    deleteWord
};

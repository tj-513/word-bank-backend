const mongodbClient = require('../../lib/mongodbClient');

const addWord = async (word, definition, sampleSentence) => {
  console.log(`Attempting to save: ${{ word, definition, sampleSentence }}`);
  try{
    const {mongodbResponse, savedWord} = await mongodbClient.saveWord({word,definition, sampleSentence, dateCreated: Date.now()});
    if(!mongodbResponse){
      return {error:true, message:'error occurred'};
    }
    console.log(`Save word success: ${savedWord}`);
    return { message: 'created successfully', data: savedWord };
  }catch(error){
    console.log(`Save word failed: ${error}`);
    return {error:true, message:'error occurred'};
  }
};

const getWords = async () => {
  console.log(`Attempting to fetch all words`);
  try{
    const {words} = await mongodbClient.getWords();
    if(!words){
      return {error:true, message:'error occurred'};
    }
    console.log(`Fetch all words successful: ${words}`);
    return { message: 'fetched successfully', data: words };
  }catch(error){
    console.log(`Fetch all words failed: ${error}`);
    return {error:true, message:'error occurred'};
  }
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

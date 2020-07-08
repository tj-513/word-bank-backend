const mongodbClient = require('../../lib/mongodbClient');

const addWord = async (word, definition, sampleSentence) => {
  console.log(
    `Attempting to save: ${JSON.stringify({
      word,
      definition,
      sampleSentence,
    })}`
  );
  try {
    const { savedWord } = await mongodbClient.saveWord({
      word,
      definition,
      sampleSentence,
      dateCreated: Date.now(),
    });
    if (!savedWord._id) {
      console.log(`Save word failed: Could not create`);
      return { error: true, message: 'error occurred' };
    }
    console.log(`Save word success: ${JSON.stringify(savedWord)}`);
    return { message: 'created successfully', data: savedWord };
  } catch (error) {
    console.log(`Save word failed: ${error}`);
    return { error: true, message: 'error occurred' };
  }
};

const getAllWords = async () => {
  console.log(`Attempting to fetch all words`);
  try {
    const { words } = await mongodbClient.getAllWords();
    if (!words) {
      return { error: true, message: 'error occurred' };
    }
    console.log(`Fetch all words successful: ${JSON.stringify(words)}`);
    return { message: 'fetched successfully', data: words };
  } catch (error) {
    console.log(`Fetch all words failed: ${error}`);
    return { error: true, message: 'error occurred' };
  }
};

const updateWord = async (_id, word, definition, sampleSentence) => {
  console.log(
    `Attempting to update word: ${{ _id, word, definition, sampleSentence }}`
  );
  try {
    const { savedWord } = await mongodbClient.updateWord({
      _id,
      word,
      definition,
      sampleSentence,
      dateModified: Date.now()
    });
    if (!savedWord) {
      return { error: true, message: 'error occurred' };
    }
    console.log(`Update word successful: ${JSON.stringify(savedWord)}`);
    return { message: 'Updated successfully', data: savedWord };
  } catch (error) {
    console.log(`Update word failed: ${error}`);
    return { error: true, message: 'error occurred' };
  }
};

const deleteWord = async (_id) => {
  console.log(
    `Attempting to delete word: _id:${ _id }`
  );
  try {
    const { mongodbResponse } = await mongodbClient.deleteWord(_id);
    if (!mongodbResponse || mongodbResponse.result.n === 0) {
      return { error: true, message: 'could not delete the word' };
    }
    console.log(`Delete word successful: ${_id}`);
    return { message: 'Deleted successfully' };
  } catch (error) {
    console.error(`Delete word failed: ${error}`);
    return { error: true, message: 'error occurred' };
  }
};

module.exports = {
  addWord,
  getAllWords,
  updateWord,
  deleteWord,
};

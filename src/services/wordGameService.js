const mongodbClient = require('../../lib/mongodbClient');
const createMongodbWordAggregate = require('../utils/createMongodbWordAggregate');
const { ObjectID } = require('mongodb');
const { shuffle } = require('lodash');

// per every 10 words
// include 4 words with zero streak
// include 3 words with one streak
const STREAK_RATIO = [4, 3, 2, 1];

const getWordsForGame = async ({ count = 10 }) => {
  console.log(`Attempting to fetch words for game ${{ count }}`);
  try {
    const facetAggregate = { $facet: {} };
    for (let index = 0; index < STREAK_RATIO.length; index += 1) {
      const mongodbAggregate = createMongodbWordAggregate({
        streakMatcher: { equalTo: index },
        sampleSize: STREAK_RATIO[index],
      });
      facetAggregate.$facet[`streak${index}`] = mongodbAggregate;
    }

    //fetch random definitions
    const randomDefinitionsAggregate = createMongodbWordAggregate({
      includeFields: ['definition'],
      sampleSize: 20,
    });
    facetAggregate.$facet['definitions'] = randomDefinitionsAggregate;

    let result = await mongodbClient.getWordsForGame([facetAggregate]);
    //flatten result
    const words = [];

    const randomDefinitions = result[0].definitions;

    delete result[0].definitions;

    Object.keys(result[0]).forEach((key) => {
      words.push(...result[0][key]);
    });

    // fill count
    if (words.length < count) {
      const excludeIds = words.map((word) => ObjectID(word._id));
      const fillWordsAggregate = createMongodbWordAggregate({
        sampleSize: count - words.length,
        excludeIds,
      });
      result = await mongodbClient.getWordsForGame(fillWordsAggregate);
      words.push(...result);
    }

    const questionsList = makeQuestionsList(words, randomDefinitions);

    console.log(`Fetch questions for game successful: ${JSON.stringify(questionsList)}`);
    return { message: 'fetched successfully', data: questionsList };
  } catch (error) {
    console.log(`Fetch words for game failed: ${error}`);
    return { error: true, message: 'error occurred' };
  }
};

const makeQuestionsList = (words, definitions) => {
  const questions = [];

  words.forEach(({_id, word, definition, sampleSentence }) => {
    const question = {
      _id,
      word,
      options: new Array(definition),
      correct: definition,
      sampleSentence
    };
    const wrongOptions = definitions
      .filter((d) => d.definition !== definition)
      .slice(0, 3)
      .map((d) => d.definition);

    question.options = shuffle(question.options.concat(wrongOptions));
    
    questions.push(question);
  });

  return questions;
};

module.exports = {
  getWordsForGame,
};

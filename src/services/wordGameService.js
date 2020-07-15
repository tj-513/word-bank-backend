const mongodbClient = require('../../lib/mongodbClient');
const createMongodbWordAggregate = require('../utils/createMongodbWordAggregate');
const { ObjectID } = require('mongodb');

// per every 10 words
// include 4 words with zero streak
// include 3 words with one streak
const STREAK_RATIO = [4, 3, 2, 1];

const getWordsForGame = async ({ count = 10 }) => {
  console.log(`Attempting to fetch words for game ${{ count }}`);
  try {

    const facetAggregate = {$facet:{}} 
    for(let index=0; index < STREAK_RATIO.length; index+=1){
      const mongodbAggregate = createMongodbWordAggregate({
        streakMatcher: { equalTo: index },
        sampleSize: STREAK_RATIO[index],
      });
      facetAggregate.$facet[`streak${index}`] = mongodbAggregate;

    }
    
    let result = await mongodbClient.getWordsForGame([facetAggregate]);
    console.log(result);
    //flatten result
    const words = [];

    Object.keys(result[0]).forEach(key=>{
      words.push(...result[0][key]);
    });

    // fill count
    if (words.length < count) {
      const excludeIds = words.map(word=> ObjectID(word._id));
      const fillWordsAggregate = createMongodbWordAggregate({sampleSize: count - words.length, excludeIds});
      result = await mongodbClient.getWordsForGame(fillWordsAggregate);
      words.push(...result);
    }

    console.log(`Fetch words for game successful: ${JSON.stringify(words)}`);
    return { message: 'fetched successfully', data: words };
  } catch (error) {
    console.log(`Fetch words for game failed: ${error}`);
    return { error: true, message: 'error occurred' };
  }
};

module.exports = {
  getWordsForGame
};

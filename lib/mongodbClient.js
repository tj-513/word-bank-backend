const { MongoClient, ObjectID } = require('mongodb');

const { ATLAS_USER, ATLAS_PASSWORD, ATLAS_CLUSTER } = process.env;
const ATLAS_DB = process.env.ATLAS_DB || 'word_bank';
const WORD_COLLECTION = process.env.WORD_COLLECTION || 'words';

const uri = `mongodb+srv://${ATLAS_USER}:${ATLAS_PASSWORD}@${ATLAS_CLUSTER}/test?retryWrites=true&w=majority`;

class MongodbClient {
  constructor() {
    this.database = null;
    this.mongoClient = new MongoClient(uri, { useNewUrlParser: true });
  }

  async initDBConnection() {
    try {
      await this.mongoClient.connect();
      this.database = this.mongoClient.db(ATLAS_DB);
    } catch (error) {
      console.error(
        `Error occurred while connecting to the mongodb Atlas cluster, ${error}`
      );
    }
  }

  async saveWord(word) {
    if (!this.database) {
      await this.initDBConnection();
    }

    // mongo modifies provided instance
    await this.database.collection(WORD_COLLECTION).insertOne(word);
    return { savedWord: word };
  }

  async getAllWords() {
    if (!this.database) {
      await this.initDBConnection();
    }

    const mongoResponse = await this.database
      .collection(WORD_COLLECTION)
      .find()
      .sort({ dateCreated: -1 })
      .toArray();
    return { words: mongoResponse };
  }

  async updateWord(word) {
    if (!this.database) {
      await this.initDBConnection();
    }

    const mongoResponse = await this.database
      .collection(WORD_COLLECTION)
      .findOneAndUpdate(
        { _id: new ObjectID(word._id) },
        {
          $set: {
            word: word.word,
            definition: word.definition,
            sampleSentence: word.sampleSentence,
            dateModified: word.dateModified,
            streak: word.streak,
          },
        },
        { returnOriginal: false }
      );
    return { mongoResponse, savedWord: mongoResponse.value };
  }

  async deleteWord(_id) {
    if (!this.database) {
      await this.initDBConnection();
    }

    const mongodbResponse = await this.database
      .collection(WORD_COLLECTION)
      .deleteOne({ _id: new ObjectID(_id) });
    return { mongodbResponse };
  }

  async getWords({ sortBy, sortOrder, limit, skip }) {
    if (!this.database) {
      await this.initDBConnection();
    }

    const sortCriteria = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const mongodbResponse = await this.database
      .collection(WORD_COLLECTION)
      .aggregate([
        {
          $facet: {
            words: [
              { $match: {} },
              { $sort: sortCriteria },
              { $skip: skip },
              { $limit: limit },
            ],
            total: [{ $count: 'count' }],
          },
        },
      ])
      .toArray();

    return { mongodbResponse };
  }

  // mongodbAggregate generated from util function
  async getWordsForGame(mongodbAggregate) {
    if (!this.database) {
      await this.initDBConnection();
    }

    const mongodbResponse = await this.database
      .collection(WORD_COLLECTION)
      .aggregate(mongodbAggregate)
      .toArray();

    return mongodbResponse;
  }

  async getWordsInIdList(idList) {
    if (!this.database) {
      await this.initDBConnection();
    }

    const objectIdList = idList.map((id) => new ObjectID(id));

    const mongodbResponse = await this.database
      .collection(WORD_COLLECTION)
      .find({ _id: { $in: objectIdList } })
      .toArray();

    return mongodbResponse;
  }

  // newStreakData [{_id:xxx, streak:xxxx}, ...]
  async writeWordGameResults(newStreakData) {
    if (!this.database) {
      await this.initDBConnection();
    }

    const dataWithObjectIds = newStreakData.map((word) => ({
      _id: new ObjectID(word._id),
      streak: word.streak,
    }));

    const bulkWriteOperations = [];

    dataWithObjectIds.forEach((word) => {
      bulkWriteOperations.push({
        updateOne: {
          filter: { _id: word._id },
          update: { $set: { streak: word.streak } },
        },
      });
    });

    return await this.database.collection(WORD_COLLECTION).bulkWrite(bulkWriteOperations);
  }
}

module.exports = new MongodbClient();

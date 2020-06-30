const { MongoClient, ObjectID } = require('mongodb');

const { ATLAS_USER, ATLAS_PASSWORD, ATLAS_CLUSTER } = process.env;
const ATLAS_DB = process.env.ATLAS_DB || 'word_bank';
const WORD_COLLECTION = process.env.WORD_COLLECTION || 'words';

const uri = `mongodb+srv://${'dbUser'}:${'ZrRKZMzPfv2aoeCH'}@${'cluster0-emnr7.mongodb.net'}/test?retryWrites=true&w=majority`;

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

  async getWords() {
    if (!this.database) {
      await this.initDBConnection();
    }

    const mongoResponse = await this.database
      .collection(WORD_COLLECTION)
      .find()
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

    const mongodbResponse = await this.database.collection(WORD_COLLECTION).deleteOne({_id: new ObjectID(_id)});
    return {mongodbResponse};
  }
}

module.exports = new MongodbClient();

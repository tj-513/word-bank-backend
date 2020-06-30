const { MongoClient } = require('mongodb');

const { ATLAS_USER, ATLAS_PASSWORD, ATLAS_CLUSTER } = process.env;
const ATLAS_DB = process.env.ATLAS_DB || 'word_bank';
const WORD_COLLECTION = process.env.WORD_COLLECTION || 'words';

// mongodb+srv://<username>:<password>@cluster0-emnr7.mongodb.net/<dbname>?retryWrites=true&w=majority
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

    const mongoResponse = await this.database
      .collection(WORD_COLLECTION)
      .insertOne(word);
    return {mongoResponse, savedWord: word};
  }

  async getWords() {
    if (!this.database) {
      await this.initDBConnection();
    }

    const mongoResponse = await this.database
      .collection(WORD_COLLECTION)
      .find()
      .toArray();
    return {words: mongoResponse};
  }
}


module.exports = new MongodbClient();

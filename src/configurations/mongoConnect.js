/* eslint-disable no-console */
const { MongoClient } = require('mongodb');

const dbConnect = (coll, cb) => {
  MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(async (client) => {
    const db = client.db('Auth').collection(coll);

    await cb(db);
    client.close();
  }).catch((error) => {
    console.log(error);
  });
};

module.exports = dbConnect;

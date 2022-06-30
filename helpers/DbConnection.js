require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGO_URL;
const logger = require('../logging/logger');

// const client = async () => {
//     try {
//         let newClient = await MongoClient.connect(url,{ useUnifiedTopology: true });
//         let db = await client.db("employee-employer")
//         console.log(newClient);
//         return db;
//     } catch (e) {
//         logger.error('Establishing connection to DB failed');
//     }
// }

// module.exports = client;


let client;

async function connect() {
    if (!client) {
        client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        .catch(err => { console.log(err); });
    }
    return client;
}

const getConectedClient = () => client;  

module.exports = { connect, getConectedClient };
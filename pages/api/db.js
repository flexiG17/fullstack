const { MongoClient } = require('mongodb');

export default async function getBlockOfTheQuestions(req, res) {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);
    const db = client.db('fullstack');
    const collection = db.collection('test');
    const test = await collection.findOne({ 'testCode': '0'});
    res.json(test);
}
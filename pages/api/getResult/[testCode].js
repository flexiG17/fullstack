const {MongoClient} = require('mongodb');

export default async function testCode(req, res) {
    const url = 'mongodb://127.0.0.1:27017';
    //const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const db = client.db('fullstack');
    const collection = db.collection('userAnswers');
    const test = await collection.findOne({testCode: '0'});
    res.json(test);
}
const { MongoClient } = require('mongodb');

export default async function sendUserStatisticToDatabase(req, res) {
    const url = 'mongodb://127.0.0.1:27017';
    //const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const db = client.db('fullstack');
    await db.collection('userAnswers')
        .insertOne({
            testCode: req.body.testCode,
            users: [
                {user0: req.body.statistics}
            ]
        })
        .then(() => {
            res.status(200).json({message: 'Изменения сохранены'})
        })
}
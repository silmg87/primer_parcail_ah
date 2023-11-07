import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient('mongodb: //127.0.0.1:27017');
const db = client.db("AH_2023");
const GamesCollection = db.collection('games');

async function getGames() {
    await client.connect();
    return GamesCollection;
}

async function getGameById(id) {
    await client.connect();
    return GamesCollection.findOne({ _id: new ObjectId(id) });
}

async function createGame(game) {
    await client.connect();
    const newGame = { ...game };

    await GamesCollection.insertOne(newGame);
    return newGame;
}

async function updateGame(id, data) {
    await client.connect();
    await GamesCollection.updateOne(
        {_id: new ObjectId(id)},
        {$set: data}
    );
    return data;
}


export {
    getGames,
    getGameById,
    createGame,
    updateGame
}

export default {
    getGames,
    getGameById,
    createGame,
    updateGame
}
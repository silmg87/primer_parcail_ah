import { MongoClient, ObjectId } from "mongodb";
import VotesService from '../services/votes.js';

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("AH_2023");
const GamesCollection = db.collection('games');

function filterQueryToMongo(filter) {
    const filterMongo = {
        "isDeleted": false
    };

    for (const field in filter) {
        filterMongo[field] = isNaN(filter[field]) ? filter[field] : parseInt(filter[field]);
    }

    return filterMongo;
}

async function calculateTotalScoreForGame(game) {
    const votes = await VotesService.getVotesByIdGame(game._id);
    const totalScore = votes.reduce((sum, vote) => sum + vote.gameplay + vote.art + vote.sound + vote.theme, 0);
    return totalScore;
}

async function processGamesWithVotes(games, filterByEdition) {
    const result = [];
  
    for (const game of games) {
      if (filterByEdition) {
        const totalScore = await calculateTotalScoreForGame(game);
        result.push({ ...game, total_score: totalScore });
      } else {
        result.push(game);
      }
    }
  
    return result;
}

async function getGames(filter = {}) {
    await client.connect();

    const filterByEdition = typeof filter['edition'] !== 'undefined' && filter['edition'] !== null;
    const filterByGenre = typeof filter['genre'] !== 'undefined' && filter['genre'] !== null;

    let games;

    if (filterByEdition) {
        const filterMongo = filterQueryToMongo(filter);
        games = await GamesCollection.find(filterMongo).toArray();
    } else {
        games = await GamesCollection.find({ "isDeleted": false }).toArray();
    }

    if (filterByGenre) {
        games = games.filter(game => game.genre === filter.genre);
    }

    const gamesWithVotes = await processGamesWithVotes(games, filterByEdition, filterByGenre);
    const orderedGames = gamesWithVotes.sort((a, b) => b.total_score - a.total_score);

    return orderedGames;
}

async function getGameById(id) {
    await client.connect();
    return GamesCollection.findOne({ _id: new ObjectId(id) });
}

async function createGame(game) {
    await client.connect();
    const newGame = {  
        ...game,
        isDeleted: false 
    };

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

async function deleteGame(id, data) {
    await client.connect();
    const deletedGameData = { isDeleted: true };
  
    await GamesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: deletedGameData }
    );
  
    return deletedGameData;
}

export {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
}

export default {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
} 
import { MongoClient, ObjectId } from "mongodb";
import VotesService from '../services/votes.js';
import GamesService from '../services/games.js';

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("AH_2023");
const JudgesCollection = db.collection('judges');

async function getJudges() {
    await client.connect();
    return JudgesCollection.find().toArray();
}

async function getJudgeById(id) {
    await client.connect();
    return JudgesCollection.findOne({ _id: new ObjectId(id) });
}

async function getJudgeVotes(idJudge) {
    await client.connect();
    const votes = await VotesService.getVotesByJudge(idJudge);
    
    const data = [];

    for (const vote of votes) {
        const game = await GamesService.getGameById(vote.game_id);

        const obj = {
            game_name: game.name,
            gameplay: vote.gameplay,
            art: vote.art,
            sound: vote.sound,
            theme: vote.theme
        }

        data.push(obj);
    }

    return data;
}

export {
    getJudges,
    getJudgeById,
    getJudgeVotes
}

export default {
    getJudges,
    getJudgeById,
    getJudgeVotes
}
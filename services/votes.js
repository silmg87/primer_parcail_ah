import { MongoClient, ObjectId } from "mongodb";
// import JudgesService from "../services/judges.js";
// import GamesService from "../services/games.js";

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("AH_2023");
const VotesCollection = db.collection('votes');

async function getVotes(idGame) {
    await client.connect();
    return VotesCollection.find({ game_id: new ObjectId(idGame) }).toArray();
}

async function createVote(idGame, vote) {
    await client.connect();
    
    const newVote = {
        ...vote,
        game_id: new ObjectId(idGame)
    }

    await VotesCollection.insertOne(newVote);
    return newVote;
}

// async function getJudgeVotes(idJudge) {
//     await client.connect();

//     const votes = VotesCollection.find({ judge_id: idJudge }).toArray();

//     const data = [];

//     for (const vote of votes) {
//         const game = await GamesService.getGameById(vote.game_id);

//         const obj = {
//             game_name: game.name,
//             gameplay: vote.gameplay,
//             art: vote.art,
//             sound: vote.sound,
//             theme: vote.theme
//         }

//         data.push(obj);
//     }

//     return data;
// }

export {
    getVotes,
    createVote,
    //getJudgeVotes
}

export default {
    getVotes,
    createVote,
    //getJudgeVotes
}
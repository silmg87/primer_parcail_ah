import { MongoClient, ObjectId } from "mongodb";
import JudgesService from "../services/judges.js";
import GamesService from "../services/games.js";

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("AH_2023");
const VotesCollection = db.collection('votes');

async function getVotesJudge(idGame) {
    await client.connect();
    const votes = await VotesCollection.find({ game_id: new ObjectId(idGame) }).toArray();

    const dataVotes = [];

    for (const vote of votes) {
        const judge = await JudgesService.getJudgeById(vote.judge_id);

        const votesJudge = {
            judge_name: judge.name,
            gameplay: vote.gameplay,
            art: vote.art,
            sound: vote.sound,
            theme: vote.theme
        };

        dataVotes.push(votesJudge);
    }

    return dataVotes;
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

async function getVotesByJudge(idJudge) {
    await client.connect();

    const votes = await VotesCollection.find({ judge_id: idJudge }).toArray();

    return votes;
}

async function getVotesByIdGame(idGame) {
    await client.connect();

    const votes = await VotesCollection.find({ game_id: new ObjectId(idGame) }).toArray();

    return votes;
}

async function getAverageCategory(idGame) {
    await client.connect();

    const votes = await VotesCollection.find({ game_id: new ObjectId(idGame) }).toArray();

    const sumByCategory = { gameplay: 0, art: 0, sound: 0, theme: 0 };
    const countByCategory = { gameplay: 0, art: 0, sound: 0, theme: 0 };

    votes.forEach(vote => {
        sumByCategory.gameplay += vote.gameplay;
        sumByCategory.art += vote.art;
        sumByCategory.sound += vote.sound;
        sumByCategory.theme += vote.theme;

        if (vote.gameplay !== null) countByCategory.gameplay += 1;
        if (vote.art !== null) countByCategory.art += 1;
        if (vote.sound !== null) countByCategory.sound += 1;
        if (vote.theme !== null) countByCategory.theme += 1;
    });

    const averagesByCategory = {
        gameplay: countByCategory.gameplay === 0 ? 0 : sumByCategory.gameplay / countByCategory.gameplay,
        art: countByCategory.art === 0 ? 0 : sumByCategory.art / countByCategory.art,
        sound: countByCategory.sound === 0 ? 0 : sumByCategory.sound / countByCategory.sound,
        theme: countByCategory.theme === 0 ? 0 : sumByCategory.theme / countByCategory.theme
    };

    const game = await GamesService.getGameById(idGame);

    return {
        game,
        averagesByCategory
    };
}

async function castVote(judge_id, idGame) {
    await client.connect();

    const existingVote = await VotesCollection.findOne({
        judge_id: judge_id,
        game_id: new ObjectId(idGame)
    });

    return existingVote !== null;
}

export {
    getVotesJudge,
    createVote,
    getVotesByJudge,
    getVotesByIdGame,
    getAverageCategory,
    castVote
}

export default {
    getVotesJudge,
    createVote,
    getVotesByJudge,
    getVotesByIdGame,
    getAverageCategory,
    castVote
}
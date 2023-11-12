import JudgesService from '../services/judges.js';
import GamesService from '../services/games.js';

export async function validateVotesExistence(req, res, next) {
    const { judge_id } = req.body;
    const { idGame } = req.params;

    const judgeExists = await JudgesService.getJudgeById(judge_id);
    if (!judgeExists) {
        return res.status(404).json({ error: "El juez que está ingresando no existe." });
    }

    const gameExists = await GamesService.getGameById(idGame);
    if (!gameExists) {
        return res.status(404).json({ error: "El juego que desea votar no existe." });
    }

    next();    
}
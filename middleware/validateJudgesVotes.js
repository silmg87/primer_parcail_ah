import VotesService from '../services/votes.js';

export async function validateVote(req, res, next) {
    const { judge_id } = req.body;
    const { idGame } = req.params;

    const castVote = await VotesService.castVote(judge_id, idGame);

    if (castVote) {
        return res.status(400).json({ error: "El juez ya ha emitido su voto para este juego." });
    }

    next();
}
import VotesService from "../services/votes.js";

function getVotes(req, res) {
    const { idGame } = req.params;
    VotesService.getVotes(idGame)
        .then(function (votes) {
            return res.status(200).json(votes);
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({err: err.msg})
            } else {
                res.status(500).json({err: "No se pudieron obtener los votos."});
            }
        })
}

async function createVote(req, res) {
    const { idGame } = req.params;
    const data = req.body;

    VotesService.createVote(idGame, data)
        .then(function (vote) {
            return res.status(200).json(vote);
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({err: err.msg})
            } else {
                res.status(500).json({err: "No se pudo realizar el voto."});
            }
        })
}

export {
    getVotes,
    createVote
}

export default {
    getVotes,
    createVote
}
import VotesService from "../services/votes.js";

function getVotesJudge(req, res) {
    const { idGame } = req.params;
    VotesService.getVotesJudge(idGame)
        .then(function (votesJudge) {
            return res.status(200).json(votesJudge);
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({err: err.msg})
            } else {
                res.status(500).json({err: "No se pudieron obtener los votos del juez."});
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

function getAverageCategory(req, res) {
    const { idGame } = req.params;
    VotesService.getAverageCategory(idGame)
        .then(function (averageCategory) {
            return res.status(200).json(averageCategory);
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({err: err.msg})
            } else {
                res.status(500).json({err: "No se pudieron obtener los promedios de las categorías de votos."});
            }
        })
}

export {
    getVotesJudge,
    createVote,
    getAverageCategory
}

export default {
    getVotesJudge,
    createVote,
    getAverageCategory
}
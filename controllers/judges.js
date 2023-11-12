import JudgesService from '../services/judges.js';

function getJudges(req, res) {
    JudgesService.getJudgeById(req.query)
        .then(function (judge) {
            return res.status(200).json(judge)
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({err: err.msg})
            } else {
                res.status(500).json({err: "No se pudieron obtener los jueces."});
            }
        })
}

function getJudgeById(req, res) {
    const { idJudge } = req.params;
    JudgesService.getJudgeById(idJudge)
        .then(function (judge) {
            return res.status(200).json(judge)
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({err: err.msg})
            } else {
                res.status(500).json({err: "No se pudo obtener el juez."});
            }
        })
}

function getJudgeVotes(req, res) {
    const { idJudge } = req.params;
    JudgesService.getJudgeVotes(idJudge)
        .then(function (judgeVotes) {
            res.status(200).json(judgeVotes);
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({ err: err.msg });
            } else {
                res.status(500).json({ err: "No se pudieron obtener los votos del juez." });
            }
        });
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
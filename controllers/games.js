import GamesService from "../services/games";

function getGames(req, res) {
    GamesService.getGames(req.query)
        .then(function (games) {
            res.status(200).json(games);
        })
        .catch(function (err) {
            res.status(500).json({err: "No se pudieron obtener los juegos."})
        })
}

function getGameById(req, res) {
    const { idGame } = req.params;
    GamesService.getGameById(idGame)
        .then(function (game) {
            return res.status(200).json(game);
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({err: err.msg})
            } else {
                res.status(500).json({err: "No se pudo obtener el juego."});
            }
        })
}

async function createGame(req, res) {
    return GamesService.createGame(req.body)
        .then(function (game) {
            res.status(201).json(game);
        })
        .catch(function (err) {
            res.status(500).json({err: "No se pudo crear el juego."})
        })
}

function updateGame(req, res) {
    const { idGame } = req.params;
    const data = req.body;

    GamesService.updateGame(idGame, data)
        .then(function (game) {
            return res.status(200).json(game);
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({err: err.msg})
            } else {
                res.status(500).json({err: "No se pudo actualizar el juego."});
            }
        })
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
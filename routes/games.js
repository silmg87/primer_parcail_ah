import express from 'express';
import GamesController from '../controllers/games';

const route = express.Router();

route.get('/games', GamesController.getGames);
route.get('/games/:idGame', GamesController.getGameById);
route.post('/games', GamesController.createGame);
route.put('/games/:idGame', GamesController.updateGame);
route.delete('/games/:idGame', GamesController.deleteGame);

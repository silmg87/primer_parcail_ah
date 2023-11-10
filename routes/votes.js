import express from 'express';
import VotesController from '../controllers/votes.js';

const route = express.Router();

route.get('/games/:idGame/votes', VotesController.getVotes);
route.post('/games/:idGame/votes', VotesController.createVote);

export default route
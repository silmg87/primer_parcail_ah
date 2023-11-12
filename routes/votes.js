import express from 'express';
import VotesController from '../controllers/votes.js';
import {validateCreateVotes} from '../middleware/votes.js';
import {validateVote} from '../middleware/validateJudgesVotes.js';
import {validateVotesExistence} from '../middleware/validateVotesExistence.js';

const route = express.Router();

route.get('/games/:idGame/votes', VotesController.getVotesJudge);
route.post('/games/:idGame/votes', [validateCreateVotes, validateVote, validateVotesExistence],VotesController.createVote);
route.get('/games/:idGame/average', VotesController.getAverageCategory)

export default route
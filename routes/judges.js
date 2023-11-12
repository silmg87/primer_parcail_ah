import express from 'express';
import JudgesController from '../controllers/judges.js'

const route = express.Router();

route.get('/judges', JudgesController.getJudges);
route.get('/judges/:idJudge', JudgesController.getJudgeById);
route.get('/judges/:idJudge/votes', JudgesController.getJudgeVotes);

export default route;
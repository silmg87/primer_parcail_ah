import express from 'express';
import GamesRoute from './routes/games.js';
import VotesRoute from './routes/votes.js';
import JudgesRoute from './routes/judges.js';

const app = express();

app.use(express.json());
app.use(GamesRoute);
app.use(VotesRoute);
app.use(JudgesRoute);

app.listen(2023, function () {
    console.log("El servidor está corriendo correctamente... http://localhost:2023")
});
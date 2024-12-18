import express from 'express';
import driversRouter from './routes/drivers.js';
import teamsRouter from './routes/team.js';


const baseAPIRoute = '/api/v1';

const app = express();

app.use(express.json());
app.use(baseAPIRoute + '/drivers', driversRouter);
app.use(baseAPIRoute + '/teams', driversRouter);


const port = 3000;
app.listen(port, () => console.log('API rodando com sucesso'));

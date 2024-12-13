//instala o express js(npm install express)
import express, { response } from 'express';
import { drivers } from './data.js';

const baseAPIRoute = '/api/v1';

const app = express();

app.get(baseAPIRoute + '/drivers', (req, resp) => {
  resp.status(200).send(drivers);
})

const port = 3000;

app.listen(port, () => console.log('API rodando com sucesso!'))
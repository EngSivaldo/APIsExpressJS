//=======Arquivo principal do projeto=================
// npm init ----- no terminal
//instala o express js(npm install express)
import express, { response } from 'express';
import { drivers } from './data.js';

//mostra todos o endpoints
const baseAPIRoute = '/api/v1';

const app = express();

//endpoint lista de todos os pilotos
app.get(baseAPIRoute + '/drivers', (req, resp) => {
  resp.status(200).send(drivers);//entregar a lista
})

//variavel guarda a porta
const port = 3000;

//quando o servidor estiver rodando corretamente
app.listen(port, () => console.log('API rodando com sucesso!'))
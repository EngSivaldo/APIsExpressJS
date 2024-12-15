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

//rota que recupera infor piloto especifico pela posicao
app.get(baseAPIRoute + '/drivers/standings/:position', (req, resp) => {
  const {position} = req.params;
  const selectDrivers = drivers[position-1]
  resp.status(200).send(selectDrivers);//entregar a lista
});

//rota do (id)
app.get(baseAPIRoute + '/drivers/:id', (req, res) => {
  const {id} = req.params;
  const selectDrivers = drivers.find(driver => driver.id === id);
  res.status(200).send(selectDrivers)

})

//variavel guarda a porta
const port = 3000;

//quando o servidor estiver rodando corretamente
app.listen(port, () => console.log('API rodando com sucesso!'))
//=======Arquivo principal do projeto=================
// npm init ----- no terminal
//instala o express js(npm install express)
import express, { response } from 'express';
import { drivers } from './data.js';
import { randomUUID } from 'node:crypto';

//mostra todos o endpoints
const baseAPIRoute = '/api/v1';

const app = express();

// Uma função de middleware embutida no Express.js. Ela analisa as solicitações recebidas com cargas úteis em JSON e é baseada na biblioteca body-parser.
app.use(express.json());

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

});
//registrar um novo piloto/fazer tratamento no Middleware
app.post(baseAPIRoute + '/drivers', (req, res) => {
  const newDriver = {...req.body, id:randomUUID() };
  drivers.push(newDriver);
  drivers.sort((b,a) => {
    if(a.points > b.points) {
      return 1;
    }
    if(b.points > a.points) {
      return -1;
    }
    return 0;
  });
  res.status(200).send(newDriver);
});

//metodo put /atualizar lista
app.put(baseAPIRoute + '/drivers/:id', (req, res) => {
  const { id } = req.params;
  const selectDrivers = drivers.find((d) => d.id === id);

  for (const key in selectDrivers) {
    if(req.body[key]) {
      selectDrivers[key] = req.body[key];
    }
  }
  res.status(200).send(selectDrivers);


});

//variavel guarda a porta
const port = 3000;

//quando o servidor estiver rodando corretamente
app.listen(port, () => console.log('API rodando com sucesso!'))












// A linha app.use(express.json()); é usada em uma aplicação Express.js para configurar um middleware que analisa as solicitações recebidas com cargas úteis em JSON. Aqui está uma explicação detalhada:

// Middleware: Funções que são executadas durante o ciclo de vida de uma solicitação ao servidor. Elas têm acesso aos objetos de solicitação e resposta e podem modificá-los.
// express.json(): Uma função de middleware embutida no Express.js. Ela analisa as solicitações recebidas com cargas úteis em JSON e é baseada na biblioteca body-parser.
// Ao usar app.use(express.json());, você está dizendo à sua aplicação Express para analisar automaticamente os dados JSON no corpo das solicitações recebidas, facilitando o manuseio e o trabalho com esses dados nas suas rotas.
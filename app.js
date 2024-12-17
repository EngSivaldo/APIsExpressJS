//=======Arquivo principal do projeto=================
// npm init ----- no terminal
//instala o express js(npm install express)
import express, { response } from 'express';
import Joi from 'joi';
import { drivers, teams } from './data.js';
import { randomUUID } from 'node:crypto';
import { send } from 'node:process';
import { join } from 'node:path';


//mostra todos o endpoints
const baseAPIRoute = '/api/v1';

const app = express();

// Uma função de middleware embutida no Express.js. Ela analisa as solicitações recebidas com cargas úteis em JSON e é baseada na biblioteca body-parser.
app.use(express.json());

//endpoint lista de construtores
app.get(baseAPIRoute + '/teams', (req, res) => {
  res.status(200).send(teams);//entregar a lista
});

//Obtendo informações de uma equipe (GET: /teams/standings/:position)
app.get(baseAPIRoute + '/teams/standings/:position', (req, res) => {
  const positionSchema = Joi.number().min(1).max(teams.length);
  const {position} = req.params;
  const { error } = positionSchema.validate(position);

  if(error) {
    res.status(400).send(error);
    return;
  }
  const selectTeam = teams[position -1];
  res.status(200).send(selectTeam);//entregar a lista
});



//endpoint lista de todos os pilotos
app.get(baseAPIRoute + '/drivers', (req, res) => {
  res.status(200).send(drivers);//entregar a lista
})

//rota que recupera infor piloto especifico pela posicao
app.get(baseAPIRoute + '/drivers/standings/:position', (req, res) => {
  const positionSchema = Joi.number().min(1).max(drivers.length);
  const {position} = req.params;
  const { error } = positionSchema.validate(position);

  if(error) {
    res.status(400).send(error);
    return;
  }
  const selectDrivers = drivers[position -1];
  res.status(200).send(selectDrivers);//entregar a lista
});

//rota do (id)
app.get(baseAPIRoute + '/drivers/:id', (req, res) => {
  const {id} = req.params;
  const selectDrivers = drivers.find(driver => driver.id === id);
  if (!selectDrivers) {
    // Se o piloto com ID fornecido não for encontrado, erro 404 mensagem apropriada
    res.status(404).send('Este piloto não existe!');
    return;
  }
  res.status(200).send(selectDrivers)

});
//registrar um novo piloto/fazer tratamento no Middleware
app.post(baseAPIRoute + '/drivers', (req, res) => {

  const driveSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    team: Joi.string().min(3).max(50).required(),
    points: Joi.number().min(0).max(1000).default(0),
  });
  const { error } = driveSchema.validate(req.body, {abortEarly: false });
  if (error) {
    res.status(400).send(error);
    return;
  }
  // console.log(error);
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

//metodo put /atualizar lista com piloto especifico
app.put(baseAPIRoute + '/drivers/:id', (req, res) => {
  const updateDriveSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    team: Joi.string().min(3).max(50),
    points: Joi.number().min(0).max(1000),
  }).min(1);

  const error = updateDriveSchema.validate(req.body, {abortEarly: false})
  if(error) {
    res.status(400).send(error);
    return;

  }

  const { id } = req.params;
  const selectDrivers = drivers.find((d) => d.id === id);
  if (!selectDrivers) {
    // Se o piloto com o ID fornecido não for encontrado, retorna um erro 404 com uma mensagem apropriada
    res.status(404).send('Este piloto não existe!');
    return;
  }

  for (const key in selectDrivers) {
    if(req.body[key]) {
      selectDrivers[key] = req.body[key];
    }
  }
  res.status(200).send(selectDrivers);
});

//end point delete
app.delete(baseAPIRoute + '/drivers/:id', (req, res) => {
  const { id } = req.params;
  const selectDrivers = drivers.find((d) => d.id === id);
  if (!selectDrivers) {
    // Se o piloto com o ID fornecido não for encontrado, retorna um erro 404 com uma mensagem apropriada
    res.status(404).send('Este piloto não existe!');
    return;
  }

  const index = drivers.indexOf(selectDrivers);

  drivers.splice(index,1);
  res.status(200).send(selectDrivers)
})

//variavel guarda a porta
const port = 3000;

//quando o servidor estiver rodando corretamente
app.listen(port, () => console.log('API rodando com sucesso!'))












// A linha app.use(express.json()); é usada em uma aplicação Express.js para configurar um middleware que analisa as solicitações recebidas com cargas úteis em JSON. Aqui está uma explicação detalhada:

// Middleware: Funções que são executadas durante o ciclo de vida de uma solicitação ao servidor. Elas têm acesso aos objetos de solicitação e resposta e podem modificá-los.
// express.json(): Uma função de middleware embutida no Express.js. Ela analisa as solicitações recebidas com cargas úteis em JSON e é baseada na biblioteca body-parser.
// Ao usar app.use(express.json());, você está dizendo à sua aplicação Express para analisar automaticamente os dados JSON no corpo das solicitações recebidas, facilitando o manuseio e o trabalho com esses dados nas suas rotas.
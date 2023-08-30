const express = require("express");
const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://imrob:TOJSELtNpNMQcJhH@cluster0.fr5g5wr.mongodb.net/";
const dbName = "jornada-backend-ago-23";
const client = new MongoClient(url);

async function main() {
  console.info("Conectando ao banco de dados...");
  await client.connect();
  console.info("Banco de dados conectado com sucesso!");

  const db = client.db(dbName);
  const collection = db.collection("herois");

  const app = express();

  // Habilitamos o processamento de JSON
  app.use(express.json());

  // Endpoint Principal
  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  //Endpoint /oi
  app.get("/oi", function (req, res) {
    res.send("Olá Mundo!");
  });

  //Endpoints de herois
  const lista = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];
  //              0                   1                 2

  //Read All -> [GET] /herois
  app.get("/herois", function (req, res) {
    res.send(lista.filter(Boolean));
  });

  // Create -> [POST] /herois
  app.post("/herois", function (req, res) {
    // console.log(req.body, typeof req.body);

    // Extrai o nome do Body da Request (Corpo da Requisição)
    const item = req.body.nome;

    // Inserir o item na lista
    lista.push(item);

    // Emviamos uma resposta de sucesso
    res.send("Item criado com sucesso!");
  });

  // Read By Id -> [GET] /herois/:id
  app.get("/herois/:id", function (req, res) {
    const id = req.params.id - 1;

    // pegamos a informação da lista
    const item = lista[id];

    res.send(item);
  });

  // Update -> [PUT] /herois/:id
  app.put("/herois/:id", function (req, res) {
    const id = req.params.id - 1;

    // Extrai o nome do Body da Request (Corpo da requisição)
    const item = req.body.nome;

    // Atualizamos a informação na lista de registros
    lista[id] = item;

    res.send("Item editado com sucesso!");
  });

  // Delete -> [DELETE] /herois/:id
  app.delete("/herois/:id", function (req, res) {
    // Pegamos o parametro de rota ID
    const id = req.params.id - 1;

    // Excluir o item da lista
    delete lista[id];

    res.send("Item excluido com sucesso!");
  });

  app.listen(3000, () =>
    console.log("Servidor rodando em http://localhost:3000")
  );
}

main();

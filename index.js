require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbUrl = process.env.DB_URL;
const url = `mongodb+srv://${dbUser}:${dbPassword}@${dbUrl}`;
const dbName = process.env.DB_NAME;
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
  app.get("/herois", async function (req, res) {
    const itens = await collection.find().toArray();
    res.send(itens);
  });

  // Create -> [POST] /herois
  app.post("/herois", async function (req, res) {
    // console.log(req.body, typeof req.body);

    // Extrai o nome do Body da Request (Corpo da Requisição)
    const item = req.body;

    // Inserir o item na collection
    await collection.insertOne(item);

    // Emviamos uma resposta de sucesso
    res.send(item);
  });

  // Read By Id -> [GET] /herois/:id
  app.get("/herois/:id", async function (req, res) {
    const id = req.params.id;

    // pegamos a informação da collection
    const item = await collection.findOne({
      _id: new ObjectId(id),
    });

    res.send(item);
  });

  // Update -> [PUT] /herois/:id
  app.put("/herois/:id", async function (req, res) {
    const id = req.params.id;

    // Extrai o nome do Body da Request (Corpo da requisição)
    const item = req.body;

    // Atualizamos a informação na collection
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: item });

    res.send("Item editado com sucesso!");
  });

  // Delete -> [DELETE] /herois/:id
  app.delete("/herois/:id", async function (req, res) {
    // Pegamos o parametro de rota ID
    const id = req.params.id;

    // Excluir o item da collection
    await collection.deleteOne({ _id: new ObjectId(id) });

    res.send("Item excluido com sucesso!");
  });

  app.listen(process.env.PORT || 3000, () =>
    console.log("Servidor rodando em http://localhost:3000")
  );
}

main();

import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

app.get(`/jokes`, async function (req, res) {
  const result = await db.query(`SELECT * FROM jokes`);
  res.json(result.rows);
});

app.post(`/jokes`, async function (req, res) {
  const jokeHeader = req.body.joke;
  const punchlineHeader = req.body.punchline;

  const sendToDatabase = await db.query(
    `INSERT INTO jokes (joke, punchline) VALUES ($1, $2)`,
    [jokeHeader, punchlineHeader]
  );

  res.json({ status: `Your joke has been uploaded` });
});

app.listen(8080, function () {
  console.log(`This server is running on port: https://localhost:8080`);
});

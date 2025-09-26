import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

db.query(
  `INSERT INTO jokes (joke, punchline) VALUES ('How much money does a skunk have?','One-Scent')`
);

db.query(`SELECT * FROM USERS WHERE id=$1`, [req.body.user_id]);

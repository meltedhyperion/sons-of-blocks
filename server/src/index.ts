import express from 'express';
import cors from "cors";
import dataRouter from "./data/data.routes"

const app = express();

  app.use(cors());

  app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.use("/data", dataRouter);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
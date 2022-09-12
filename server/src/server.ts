import express from "express";

const app = express();

app.use(express.json());

app.get("/ads", (request, response) => {
  return response.send("teste");
});

app.listen(3333, () => console.log("server is running"));

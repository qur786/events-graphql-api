import express from "express";

const app = express();

const PORT =
  typeof process.env.PORT === "string"
    ? Number.parseInt(process.env.PORT)
    : 3000;

app.use("/graphql", (_req, res) => res.send("Graphql"));

app.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

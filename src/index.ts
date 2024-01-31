import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import expressPlayGround from "graphql-playground-middleware-express";

const app = express();

const PORT =
  typeof process.env.PORT === "string"
    ? Number.parseInt(process.env.PORT)
    : 3000;

app.all(
  "/graphql",
  createHandler({
    schema: buildSchema(`
    type Query {
      hello: String!
    }
    `),
    rootValue: {
      hello: () => "Hello! Qurban",
    },
  })
);

app.get("/playground", expressPlayGround.default({ endpoint: "/graphql" }));

app.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

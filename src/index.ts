import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import expressPlayGround from "graphql-playground-middleware-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { schemas } from "./graphql/schemas/event.resolver.js";
import { resolvers } from "./graphql/resolvers/event.schema.js";

const app = express();

const PORT =
  typeof process.env.PORT === "string"
    ? Number.parseInt(process.env.PORT)
    : 3000;

app.all(
  "/graphql",
  createHandler({
    schema: makeExecutableSchema({
      typeDefs: schemas,
      resolvers,
    }),
  })
);

app.get("/playground", expressPlayGround.default({ endpoint: "/graphql" }));

app.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

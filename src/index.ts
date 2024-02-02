import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import expressPlayGround from "graphql-playground-middleware-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { schemas } from "./graphql/schemas/event.schema.js";
import { resolvers } from "./graphql/resolvers/event.resolver.js";
import "dotenv/config";
import { connect } from "mongoose";

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

connect("")
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

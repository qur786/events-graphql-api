import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import expressPlayGround from "graphql-playground-middleware-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFiles } from "@graphql-tools/load-files";

const app = express();

const PORT =
  typeof process.env.PORT === "string"
    ? Number.parseInt(process.env.PORT)
    : 3000;

app.all(
  "/graphql",
  createHandler({
    schema: makeExecutableSchema({
      typeDefs: await loadFiles("src/graphql/schemas/**/*.graphql"),
    }),
    rootValue: {
      event: () => "Hello! Qurban",
    },
  })
);

app.get("/playground", expressPlayGround.default({ endpoint: "/graphql" }));

app.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

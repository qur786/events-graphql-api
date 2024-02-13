import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import expressPlayGround from "graphql-playground-middleware-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { eventSchemas } from "./graphql/schemas/event.schema.js";
import { userSchemas } from "./graphql/schemas/user.schema.js";
import { userResolvers } from "./graphql/resolvers/user.resolver.js";
import { eventResolvers } from "./graphql/resolvers/event.resolver.js";
import "dotenv/config";
import { connect, disconnect } from "mongoose";
import { bookingSchemas } from "./graphql/schemas/booking.schema.js";
import { bookingResolvers } from "./graphql/resolvers/booking.resolver.js";
import { createTerminalLink } from "./utils.js";

const app = express();

const PORT =
  typeof process.env.PORT === "string"
    ? Number.parseInt(process.env.PORT)
    : 3000;

app.all(
  "/graphql",
  createHandler({
    schema: makeExecutableSchema({
      typeDefs: [userSchemas, eventSchemas, bookingSchemas],
      resolvers: [userResolvers, eventResolvers, bookingResolvers],
    }),
  })
);

app.get("/playground", expressPlayGround.default({ endpoint: "/graphql" }));

[
  `exit`,
  `SIGINT`,
  `SIGUSR1`,
  `SIGUSR2`,
  `uncaughtException`,
  `SIGTERM`,
].forEach((eventType) => {
  process.on(eventType, async () => await disconnect());
}); // Clean up Ref: https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits

connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@events-graphql-api.29j6yzs.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
)
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server is listening on port ${PORT}`);
      if (process.env.NODE_ENV !== "production") {
        const playground = createTerminalLink(
          "http://localhost:3000/playground",
          "http://localhost:3000/playground"
        );

        console.log(`Access graphql playground at: ${playground}`);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

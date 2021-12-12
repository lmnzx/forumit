import "reflect-metadata";
import fastify from "fastify";
import mercurius from "mercurius";
import { buildSchema } from "type-graphql";
import { PingResolver } from "./graphql";

(async () => {
  const app = fastify({
    logger: {
      prettyPrint: true,
    },
    disableRequestLogging: true,
  });

  app.register(mercurius, {
    schema: await buildSchema({
      resolvers: [PingResolver],
      validate: false,
    }),
    path: "/",
    graphiql: true,
    logLevel: "debug",
  });

  await app.listen(3000);
})();

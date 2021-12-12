import "reflect-metadata";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import mercurius from "mercurius";
import { buildSchema } from "type-graphql";
import { PingResolver, UserResolver } from "./graphql";
import shutdownPlugin from "./plugins/shutdown";
import prismaPlugin from "./plugins/prisma";
import { Context } from "./types/context";

(async () => {
  const app = fastify({
    logger: {
      prettyPrint: true,
    },
    disableRequestLogging: true,
  });

  app.register(shutdownPlugin);
  app.register(prismaPlugin);

  app.register(mercurius, {
    schema: await buildSchema({
      resolvers: [PingResolver, UserResolver],
      validate: false,
    }),
    path: "/",
    context: (request: FastifyRequest, reply: FastifyReply): Context => ({
      prisma: app.prisma,
      request,
      reply,
    }),
    logLevel: process.env.NODE_ENV === "production" ? "error" : "debug",
    graphiql: true,
  });

  await app.listen(3000);
})();

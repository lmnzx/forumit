import { FastifyPluginAsync } from "fastify";

const shutdownPlugin: FastifyPluginAsync = async (app, _opts) => {
  process.on("SIGTERM", () => app.close());
  process.on("SIGINT", () => app.close());
};

export default shutdownPlugin;

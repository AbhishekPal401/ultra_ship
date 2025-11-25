import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import buildSchema from "./schema.js";
import { buildContext } from "./middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

async function startServer() {
  const schema = await buildSchema();

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 },

    context: buildContext,

    cors: {
      origin: "*",
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "OPTIONS"],
    },
  });

  console.log(`🚀 Apollo Standalone Server running at ${url}`);
}

startServer();

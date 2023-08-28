import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "../graphql/typedefs.js";
import { resolvers } from "../graphql/resolvers.js";
import { connectDB } from "../utils/connectDB.js";
import cookieParser from "cookie-parser";
import express from "express";

const app = express();

const port = process.env.PORT || 8080;

async function connectToDatabase() {
  await connectDB();
}
connectToDatabase();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => ({ req, res }),
    listen: { port: port },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
    `);
}
startApolloServer();

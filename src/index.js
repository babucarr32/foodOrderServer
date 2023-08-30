import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "../graphql/typedefs.js";
import { resolvers } from "../graphql/resolvers.js";
import { connectDB } from "../utils/connectDB.js";
import cookieParser from "cookie-parser";
import express from "express";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const app = express();

const port = process.env.PORT || 8080;

async function connectToDatabase() {
  await connectDB();
}
connectToDatabase();

function TwilioMessage() {
  client.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+17076201489",
      to: "+2203626260",
    })
    .then((message) => console.log(message.sid));
}
TwilioMessage();

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

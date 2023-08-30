import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "../graphql/typedefs.js";
import { resolvers } from "../graphql/resolvers.js";
import { connectDB } from "../utils/connectDB.js";
import { MessageSender } from "../utils/MessageSender.js";
import { getOrders } from "../utils/getOrders.js";
import { twilioMessage } from "../utils/TwillioMsg.js";

const port = process.env.PORT || 8080;

async function connectToDatabase() {
  await connectDB();
}
connectToDatabase();

MessageSender(() => getOrders());

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

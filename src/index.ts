import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import { typeDefs } from "./graphql/typedefs";
// import { resolvers } from "./graphql/resolvers";
// import { connectDB } from "../utils/connectDB.js";
// import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
// import { data } from "../utils/db.js";

const app = express();

const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//   await connectDB();
// }
// // connectToDatabase();

// const typeDefs = `#graphql
// type User{
//     username: String
//     password: String
// }

// type Query{
//     user: [User]
// }
// `;

// const resolvers = {
//   Query: {
//     async user() {
//       return data.users;
//     },
//   },
// };

// async function startApolloServer() {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });
//   const { url } = await startStandaloneServer(server, {
//     context: async ({ req, res }) => ({ req, res }),
//     listen: { port: 4000 },
//   });
//   console.log(`
//     🚀  Server is running!
//     📭  Query at ${url}
//     `);
// }
// // startApolloServer();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
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
//# sourceMappingURL=index.js.map
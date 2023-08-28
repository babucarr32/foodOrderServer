"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
// import { typeDefs } from "./graphql/typedefs";
// import { resolvers } from "./graphql/resolvers";
const connectDB_1 = require("../utils/connectDB");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const db_1 = require("../utils/db");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connectDB_1.connectDB)();
    });
}
// connectToDatabase();
const typeDefs = `#graphql 
type User{
    username: String
    password: String
}

type Query{
    user: [User]
}
`;
const resolvers = {
    Query: {
        user() {
            return __awaiter(this, void 0, void 0, function* () {
                return db_1.data.users;
            });
        },
    },
};
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new server_1.ApolloServer({
            typeDefs,
            resolvers,
        });
        const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
            context: ({ req, res }) => __awaiter(this, void 0, void 0, function* () { return ({ req, res }); }),
            listen: { port: 4000 },
        });
        console.log(`
    🚀  Server is running!
    📭  Query at ${url}
    `);
    });
}
// startApolloServer();
//# sourceMappingURL=index.js.map
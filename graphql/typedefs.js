export const typeDefs = `#graphql
type User{
    username: String
    password: String
    currentChoice: String
    favorite: [String]
}

type OrderFoods{
    name: String
    currentChoice: String
    username: String
}

input createAccount{
    username: String
    password: String
}

type Query{
    user(ID: String): User!
    users: [User]
    orderFoods: [OrderFoods]
}

type Mutation{
    createAccount(credentials: createAccount): User
    editAccount(credentials: createAccount): User
    deleteAccount(id: ID): Boolean
    addToFavorites(id: ID): User
    addFromFavorites(id: ID): User
}
`;

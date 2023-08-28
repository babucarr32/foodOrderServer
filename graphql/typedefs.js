export const typeDefs = `#graphql
type User{
    id: ID
    username: String
    password: String
    currentChoice: String
    favorites: [FavFood]
}

type FavFood{
    food_id: String 
    foodName:  String 
},
    

type availableFoods{
    id: ID
    name: String
}

type OrderFoods{
    id: ID
    fooName: String
    username: String
}

input CreateAccount{
    username: String
    password: String
}


input AddToFavorites{
    user_id: ID
    food_id: ID
    food_name: String
}

type Query{
    user(ID: String): User!
    users: [User]
    orderFoods: [OrderFoods]
    foods: [availableFoods]
}

type Mutation{
    createAccount(credentials: CreateAccount): User
    editAccount(credentials: CreateAccount): User
    deleteAccount(ID: ID): Boolean
    addToFavorites(info: AddToFavorites): User
    removeFromFavorites(info: AddToFavorites): User
    addFood(foodName: String):availableFoods
}
`;

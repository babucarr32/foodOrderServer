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
    

type AvailableFoods{
    id: ID
    name: String
}

type Orders{
    id: String
    foodName: String
    username: String
    user_id: String 
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

input RemoveFromFavorites{
    user_id: ID
    food_id: ID
}

input OrderedFoods{
    foodName: String
    username: String
    user_id: String 
}

type Query{
    user(ID: String): User!
    users: [User]
    orders: [Orders]
    foods: [AvailableFoods]
}

type Mutation{
    createAccount(credentials: CreateAccount): User
    editAccount(credentials: CreateAccount): User
    deleteAccount(ID: ID): Boolean
    addToFavorites(info: AddToFavorites): User
    removeFromFavorites(info: RemoveFromFavorites): User
    addFood(foodName: String):AvailableFoods
    makeOrder(info: OrderedFoods): Orders
}
`;

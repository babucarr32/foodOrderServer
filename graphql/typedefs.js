export const typeDefs = `#graphql
type LoggedInUser{
    id: ID
    username: String
    currentChoice: String
    favorites: [FavFood]
    accessToken: String
}

type User{
    id: ID
    username: String
    password: String
    currentChoice: String
    favorites: [FavFood]
}

type FavFood{
    id: ID
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

input Login{
    username: String
    password: String
}

input CreateAccount{
    username: String
    password: String
}

input EditAccount{
    user_id: String
    username: String
    currentPassword: String
    newPassword: String

}


input AddToFavorites{
    user_id: ID
    food_name: String
}

input RemoveFromFavorites{
    user_id: ID
    food_name: ID

}

input MakeOrder{
    food_name: String
    user_id: String 
}

type Query{
    user(ID: String): User!
    users: [User]
    orders: [String]
    foods: [AvailableFoods]
}



type Mutation{
    createAccount(credentials: CreateAccount): LoggedInUser
    editAccount(credentials: EditAccount): User
    deleteAccount(ID: ID): Boolean
    login(credentials: Login):LoggedInUser
    addToFavorites(info: AddToFavorites): User
    removeFromFavorites(info: RemoveFromFavorites): User
    addFood(foodName: String):AvailableFoods
    makeOrder(info: MakeOrder): User
    verifyJWTToken(token: String): String
}
`;

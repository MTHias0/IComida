const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
    type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
}
type Post{
    _id: ID!
    title: String!
    content: String!
    author: User!
}
type Query {
    nome: String
    users: [User!]!
    getUserByEmail(email: String!): User!
}
type Mutation {
    createUser(name: String!, email: String!): User!
}
`;
const users = [
    {_id: String(Math.random()), name: 'Ana Silva', email: 'ana.silva@hotmail.com', active: true},
    {_id: String(Math.random()), name: 'Carlos Oliveira', email: 'carlos.oliveira@email.com', active: false},
    {_id: String(Math.random()), name: 'Maria Santos', email: 'maria.santos@email.com', active: true},
    {_id: String(Math.random()), name: 'Joao Lima', email: 'joao.lima@email.com', active: false},
    {_id: String(Math.random()), name: 'Lucia Almeida', email: 'lucia.almeida@email.com', active: true},
    ];
const resolvers = {
    Query: {
        nome: () => '',
        users: () => users,
        getUserByEmail: (_, args) => {
        return users.find((user) => user.email === args.email);
        },
        },
        Mutation: {
            createUser: (_, args) => {
                const newUser ={
                    _id: String(Math.random()),
                    name: args.name,
                    email: args.email,
                    active: true
                };
            users.push(newUser);
            return newUser;
    }
}
};
const server = new ApolloServer({ typeDefs, resolvers});
server.listen().then(({ url}) => console.log(`Servidor ativo ${url}`));


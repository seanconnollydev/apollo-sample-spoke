const { ApolloServer, gql } = require('apollo-server-micro')
const { TodosAPI } = require('./TodosAPI');

const typeDefs = gql`
  type Query {
    todo(id: ID!): Todo
  }

  type Todo {
    id: ID!
    title: String!
  }
`

const resolvers = {
  Query: {
    todo(_, args, { dataSources }) {
      return dataSources.todos.getTodo(args.id);
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    todos: new TodosAPI(),
  }),
  introspection: true,
  playground: true
})

module.exports = server.createHandler();
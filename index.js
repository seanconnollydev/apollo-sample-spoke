const { ApolloServer, gql } = require('apollo-server-micro');
const { buildFederatedSchema } = require("@apollo/federation");
const { TodosAPI } = require('./TodosAPI');

const typeDefs = gql`
  type Query {
    todo(id: ID!): Todo
  }

  type Todo @key(fields: "id") {
    id: ID!
    title: String!
    user: User
  }

  extend type User @key(fields: "id") {
    id: ID! @external
  }
`

const resolvers = {
  Query: {
    todo(_, args, { dataSources }) {
      return dataSources.todos.getTodo(args.id);
    },
  },
  Todo: {
    user(todo) {
      return { __typename: "User", id: todo.userId };
    }
  },
}

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ]),
  dataSources: () => ({
    todos: new TodosAPI(),
  }),
  introspection: true,
  playground: true
})

module.exports = server.createHandler();
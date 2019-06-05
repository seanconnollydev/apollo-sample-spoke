const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { buildFederatedSchema } = require("@apollo/federation");
const { TodosAPI } = require('./TodosAPI');

const port = process.env.PORT || 3002;

const server = express();

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

const apolloServer = new ApolloServer({
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

apolloServer.applyMiddleware({ app: server });

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Spoke ready on port: ${port}`); // eslint-disable-line no-console
});

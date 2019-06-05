const express = require('express');
const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require('apollo-server-express');

const port = process.env.PORT || 3001;

const gateway = new ApolloGateway({
  serviceList: [
    { name: "hub", url: "https://apollo-sample-hub.goldenshun.now.sh/graphql" },
    { name: "spoke", url: "http://localhost:3002/graphql" },
  ]
});

const server = express();

(async () => {
  const { schema, executor } = await gateway.load();

  const apolloServer = new ApolloServer({ schema, executor });
  apolloServer.applyMiddleware({ app: server });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on port: ${port}`); // eslint-disable-line no-console
  });
})();

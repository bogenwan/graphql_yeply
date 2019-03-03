const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

const path = require('path');

require('dotenv').config(
  {
    path: path.join(__dirname, '/../../.env')
  }
);
// console.log(process.env);

// const graphqlHTTP = require('express-graphql');
// const { buildSchema } = require('graphql');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Street Fighter',
    author: 'Capcom'
  },
  {
    title: 'King of Fighter',
    author: 'Namco'
  }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books
  }
};


// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// app is from an existing express app
server.applyMiddleware({ app });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000 ${graphqlPath}`)
});









// // Construct a schema, using GraphQL schema language
// var schema = buildSchema (`
//   type Query {
//     hello: String,
//     bye: String,
//     testNum: Int
//   }
// `);

// // The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'hello world!';
//   },
//   bye: () => {
//     return 'bye bye world!';
//   },
//   testNum: 888
// };

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));

// app.get('/', (req, res) => res.send(`Hello World! ${process.env.YELP_API_KEY}`));
// app.get('/test', (req, res) => res.send('Good bye World!'));

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

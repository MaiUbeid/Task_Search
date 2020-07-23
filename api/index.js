const { ApolloServer, gql } = require('apollo-server');

const data = require('./data.json');

const typeDefs = gql`
  type Category {
    id: Int
    title: String
    keywords: [String]
  }

  type Query {
    allCategories: [Category]
  }
`;

const resolvers = {
  Query: {
    allCategories: () => {
      return data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

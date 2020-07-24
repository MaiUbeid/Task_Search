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
    postCategory(id: Int!, title: String!): Category
  }
`;

const resolvers = {
  Query: {
    allCategories: () => {
      return data;
    },
    postCategory: (_, { id }, { title }) => {
      return;
      // something will do to post the category
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

const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Category {
    id: Int
    title: String
    keywords: [String]
  }

  type Query {
    allCategories: [Category]
    postCategory(id: Int, title: String): [String]!
  }
`;

const resolvers = {
  Query: {
    allCategories: () => {
      return [
        { id: 1, title: 'sport', keywords: ['football, tennis'] },
        { id: 2, title: 'dance', keywords: ['football, tennis'] },
      ];
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

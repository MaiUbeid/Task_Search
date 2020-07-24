const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const { allCategories } = require('./categories.json');

const typeDefs = gql`
  type Category {
    id: Int
    title: String
    keywords: [String]
  }

  type ApiCategory {
    word: String
    score: Int
    tags: [String]
  }

  type Query {
    getAllCategories: [Category]
    postCategory: [ApiCategory]
  }
`;

const resolvers = {
  Query: {
    getAllCategories: () => {
      return allCategories;
    },

    postCategory: async (_parent, args) => {
      const { category } = args;
      console.log('mai');
      try {
        const keywords = await axios.get(
          `https://api.datamuse.com/words?ml=${category}`
        );

        console.log(keywords);

        return keywords.data.slice(0, 9).map((item) => {
          return item;
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
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

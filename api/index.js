const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const queryString = require('querystring');

const { allCategories } = require('./categories.json');

const addCategoryJson = (newCategory) => {
  const filePath = path.join(__dirname, 'categories.json');

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'application/javascript' });
      response.end();
    } else {
      const categories = JSON.parse(file);
      categories.allCategories.push(newCategory);
      fs.writeFile(filePath, JSON.stringify(categories), (err) =>
        console.log(err)
      );
    }
  });
};

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
    postCategory(category: String): [ApiCategory]
  }
`;

const resolvers = {
  Query: {
    getAllCategories: () => {
      return allCategories;
    },

    postCategory: async (_parent, args) => {
      const { category } = args;
      try {
        const keywords = await axios.get(
          `https://api.datamuse.com/words?ml=${category}`
        );

        const newCategory = {
          id: allCategories.length + 1,
          title: category,
          keywords: keywords.data
            .map((item) => {
              return item.word;
            })
            .slice(0, 3),
        };

        addCategoryJson(newCategory);

        return keywords.data.slice(0, 9).map((item) => {
          return item;
        });
      } catch (error) {
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

const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const queryString = require('querystring');

const { allCategories } = require('./categories.json');

const addCategoryJson = () => {
  // data will be an argument from api
  const data = {
    id: allCategories.length + 1,
    title: 'write',
    keywords: [
      'publish',
      'compose',
      'pen',
      'spell',
      'drop',
      'a line',
      'indite',
      'read',
      'rewrite',
      'submit',
    ],
  };

  const convertedData = queryString.parse(allCategories);
  const filePath = path.join(__dirname, 'categories.json');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'application/javascript' });
      response.end();
    } else {
      const categories = JSON.parse(file);
      const fileData = convertedData;
      console.log(fileData);
      categories.allCategories.push(data);
      console.log(categories);
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
      try {
        const keywords = await axios.get(
          `https://api.datamuse.com/words?ml=${category}`
        );

        addCategoryJson(keywords);

        // return keywords.data.slice(0, 9).map((item) => {
        //   return item;
        // });
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

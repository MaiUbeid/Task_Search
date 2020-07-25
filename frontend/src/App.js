import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Table from './components/Table';
import './style.scss';

const GET_ALL_CATEGORIES = gql`
  {
    getAllCategories {
      id
      title
      keywords
    }
  }
`;

const POST_CATEGORY = gql`
  query postCategory($category: String) {
    postCategory(category: $category) {
      word
      tags
    }
  }
`;

function App() {
  const [input, setInput] = useState('');
  const [categories, setCategories] = useState([]);
  const rows = [];

  const {
    data: Categories,
    loading: CategoriesLoading,
    error: CategoriesError,
  } = useQuery(GET_ALL_CATEGORIES);

  useQuery(POST_CATEGORY, {
    variables: {
      category: categories.length > 0 && categories[categories.length - 1],
    },
  });

  const handleChange = ({ target: { value } }) => {
    if (value !== '') {
      value = value.trim().toLowerCase();
      setInput(value);
    }
  };

  const handleClick = () => {
    setCategories((categories) => categories.concat(input));
  };

  const addKeyword = (e) => {
    if (e.target.parentNode.nodeName.toLowerCase() === 'tr') {
      const id = e.target.parentNode.getAttribute('data-id');
      const { title, keywords } = Categories.getAllCategories.find((item) => {
        if (item.id == id) return item;
      });
      console.log(title, keywords);
      const newKeyword = 'mai'; // here need to make request with the category title to get new keyword
      if (!keywords.includes(newKeyword)) {
        // add keyword to json and table
      }
    }
  };

  if (CategoriesLoading) return <p>Loading...</p>;
  if (CategoriesError) return <p>Error</p>;

  return (
    <div className="app">
      <h1 className="app__logo">
        Get <span className="app__logo--span">Categories</span>
      </h1>

      <input
        type="text"
        name="category"
        placeholder="Type Category..."
        className="app__input"
        onChange={handleChange}
      />

      {Categories.getAllCategories.map((category) => {
        rows.push({
          id: category.id,
          title: category.title,
          keywords: category.keywords.join(', '),
        });
      })}

      <Table
        rows={rows}
        columns={['Category', 'Keywords', '']}
        id={1}
        className="app__table"
        addKeyword={addKeyword}
      />

      <div className="app__button">
        <button className="app__button--text" onClick={handleClick}>
          Add Category
        </button>
      </div>
    </div>
  );
}

export default App;

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
  query allKeywords($category: String) {
    allKeywords(category: $category) {
      word
      score
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

  const { data, error, loading } = useQuery(POST_CATEGORY, {
    variables: { category: categories[categories.length - 1] },
  });

  const handleChange = ({ target: { value } }) => {
    value = value.trim().toLowerCase();
    setInput(value);
  };

  const handleClick = () => {
    setCategories((categories) => categories.concat(input));
  };

  const addKeyword = (e) => {
    if (e.target.parentNode.nodeName.toLowerCase() === 'tr') {
      const id = e.target.parentNode.getAttribute('data-id');
      console.log(id);
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
          keywords: category.keywords.slice(0, 3).join(', '),
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

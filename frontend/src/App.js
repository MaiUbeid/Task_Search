import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Table from './components/Table';
import './style.scss';

const GET_INFO = gql`
  query allCategories($category: String) {
    allCategories(category: $category) {
      word
      score
      tags
    }
  }
`;

function App() {
  const [input, setInput] = useState('');

  const [categories, setCategories] = useState(['sport']);

  const { data, loading, error } = useQuery(GET_INFO, {
    variables: { category: categories[categories.length - 1] },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const rows = [];
  let row = {};
  let keywordsString = '';
  let keywordsArray = [];
  let keywordsLength = 1;

  const handelChange = ({ target: { value } }) => {
    value = value.trim().toLowerCase();
    setInput(value);
  };

  const handelClick = () => {
    setCategories((categories) => categories.concat(input));
  };

  const getRows = (category) => {
    row = { title: category };
    data.allCategories.map((item) => {
      keywordsString += `${item.word}, `;
    });
    keywordsArray = keywordsString.split(',');
    row = { ...row, keywords: [keywordsArray.slice(0, 1)] };
    rows.push(row);
    return row.keywords.length;
  };

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
        onChange={handelChange}
      />

      {categories.map((category) => {
        keywordsLength = getRows(category);
      })}

      <Table
        rows={rows}
        columns={['Category', 'Keywords', '']}
        id={1}
        className="app__table"
        keywords={keywordsArray}
        keywordsLength={keywordsLength}
      />

      <div className="app__button">
        <button className="app__button--text" onClick={handelClick}>
          Add Category
        </button>
      </div>
    </div>
  );
}

export default App;

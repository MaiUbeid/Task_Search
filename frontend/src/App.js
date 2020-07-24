import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Table from './components/Table';
import './style.scss';

const GET_INFO = gql`
  {
    allCategories {
      word
      score
      tags
    }
  }
`;

function App() {
  const [category, setCategory] = useState('ring');

  const { data, loading, error } = useQuery(GET_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const rows = [];
  let row = {};
  let keywordsString = '';

  const getRows = (category) => {
    row = { title: category };
    data.allCategories.map((item) => {
      keywordsString += `${item.word}, `;
    });
    row = { ...row, keywords: keywordsString.split(',')[0] };
    rows.push(row);
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
        onChange={(event) => {
          event.preventDefault();
          setCategory(event.target.value.trim().toLowerCase());
        }}
      />

      {getRows(category)}

      <Table
        rows={rows}
        columns={['Category', 'Keywords', '']}
        id={1}
        className="app__table"
        keywords={keywordsString}
      />

      <div className="app__button">
        <button className="app__button--text">Add Category</button>
      </div>
    </div>
  );
}

export default App;

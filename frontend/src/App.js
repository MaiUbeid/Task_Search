import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Table from './components/Table';
import './style.scss';

const GET_INFO = gql`
  {
    allCategories {
      id
      title
      keywords
    }
  }
`;

const POST_CATEGORY = gql`
  {
    postCategory($id: Int!, $title: String!) {
      keywords
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(GET_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const rows = [];

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
      />
      {data.allCategories.map((item) => {
        let row = { title: item.title };
        item.keywords.map((keyword) => {
          row = {
            ...row,
            keywords: keyword,
          };
          rows.push(row);
          return keyword;
        });
      })}

      <Table
        rows={rows}
        columns={['Category', 'Keywords']}
        id={1}
        className="app__table"
      />

      <div className="app__button">
        <button className="app__button--text">Add Category</button>
      </div>
    </div>
  );
}

export default App;

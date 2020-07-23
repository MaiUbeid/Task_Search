import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_INFO = gql`
  {
    allCategories {
      id
      title
      keywords
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(GET_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data.allCategories);
  return (
    <div>
      <input type="text" name="category" placeholder="Type Category" />
      {data.allCategories.map((item) => {
        return `${item.title} ... ${item.keywords.map((keyword) => {
          return keyword;
        })} `;
      })}
    </div>
  );
}

export default App;

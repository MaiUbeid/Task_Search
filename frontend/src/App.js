import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// this is wrong here I need to make query
const GET_INFO = gql`
  {
    pokemons(first: 150) {
      id
      number
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(GET_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return <div>{data}</div>;
}

export default App;

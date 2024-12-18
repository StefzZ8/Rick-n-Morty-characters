import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Defining the graphQL query
const GET_CHARACTERS = gql`
  query GetCharacters {
    characters(page: 2) {
      results {
        id
        name
        image
        status
        gender
        species 
         origin {
         id
         }
      }
    }
  }
`;

const CharacterList = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {data.characters.results.map(character => (
        <div key={character.id} >
          <img
            src={character.image}
            alt={character.name}
          />
          <h3>{character.name}</h3>
          <h3>{character.status}</h3>
          <h3>{character.gender}</h3>
          <h3>{character.species}</h3>
          <h3>{character.origin.id}</h3>

        </div>
      ))}
    </div>
  );
};

export default CharacterList;
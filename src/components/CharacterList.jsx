import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './CharacterList.css';

// GraphQL query with variables
const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $status: String, $species: String) {
    characters(page: $page, filter: { status: $status, species: $species }) {
      results {
        id
        name
        image
        status
        species
        gender
        origin {
          name
        }
      }
      info {
        pages
        next
        prev
      }
    }
  }
`;

const CharacterList = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [sortBy, setSortBy] = useState('');

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page, status, species },
  });

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  // Sorting logic
  let characters = [...data.characters.results];
  if (sortBy === 'name') {
    characters.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'origin') {
    characters.sort((a, b) =>
      (a.origin?.name || '').localeCompare(b.origin?.name || '')
    );
  }

  return (
    <div className="character-list-container">
      <h1>Rick and Morty Characters</h1>

      {/* Filters */}
      <div className="filters">
        <select onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="">All Status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select onChange={(e) => setSpecies(e.target.value)} value={species}>
          <option value="">All Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="">No Sorting</option>
          <option value="name">Sort by Name</option>
          <option value="origin">Sort by Origin</option>
        </select>
      </div>

      {/* Character Cards */}
      <div className="character-grid">
        {characters.map((character) => (
          <div className="character-card" key={character.id}>
            <img
              src={character.image}
              alt={character.name}
              className="character-image"
            />
            <h3>{character.name}</h3>
            <p>
              <strong>Status:</strong>{' '}
              <span
                className={`status ${character.status.toLowerCase()}`}
              >
                {character.status}
              </span>
            </p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Origin:</strong> {character.origin?.name || 'Unknown'}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={!data.characters.info.prev}
          className="pagination-button"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={!data.characters.info.next}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
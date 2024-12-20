import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
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
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [sortBy, setSortBy] = useState('');

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page, status, species },
  });

  if (loading) return <div className="loader">{t('Loading..')}</div>;
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
      <h1>{t('title')}</h1>

      {/* Filters */}
      <div className="filters">
        <select onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="">{t('status.all')}</option>
          <option value="Alive">{t('status.alive')}</option>
          <option value="Dead">{t('status.dead')}</option>
          <option value="unknown">{t('status.unknown')}</option>
        </select>

        <select onChange={(e) => setSpecies(e.target.value)} value={species}>
          <option value="">{t('species.all')}</option>
          <option value="Human">{t('species.human')}</option>
          <option value="Alien">{t('species.alien')}</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="">{t('sorting.none')}</option>
          <option value="name">{t('sorting.name')}</option>
          <option value="origin">{t('sorting.origin')}</option>
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
              <strong>{t('character.status')}:</strong>{' '}
              <span
                className={`status ${character.status.toLowerCase()}`}
              >
                {t(`status.${character.status.toLowerCase()}`)}
              </span>
            </p>
            <p>
              <strong>{t('character.species')}:</strong> {character.species}
            </p>
            <p>
              <strong>{t('character.gender')}:</strong> {character.gender}
            </p>
            <p>
              <strong>{t('character.origin')}:</strong>{' '}
              {character.origin?.name || t('status.unknown')}
            </p>
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
          {t('pagination.previous')}
        </button>
        <span>
          {t('pagination.page')} {page}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={!data.characters.info.next}
          className="pagination-button"
        >
          {t('pagination.next')}
        </button>
      </div>

      {/*Language Switcher */}
      <footer className="footer">
        <p>Switch Language :</p>
        <button onClick={() => i18n.changeLanguage('en')}>English</button>
        <button onClick={() => i18n.changeLanguage('de')}>Deutsch</button>
      </footer>
    </div>
  );
};

export default CharacterList;
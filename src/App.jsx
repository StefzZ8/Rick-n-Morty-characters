import './App.scss'
import React from 'react';
import CharacterList from './components/CharacterList';

const App = () => {
  return (
    <div >
      <h1>Rick and Morty Characters</h1>
      <CharacterList />
    </div>
  );
};

export default App;
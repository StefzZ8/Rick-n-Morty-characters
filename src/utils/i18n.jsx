import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // Connects react to i18n
  .init({
    resources: {
      en: {
        translation: {
          title: 'Rick and Morty Characters',
          filters: {
            status: 'Filter by Status',
            species: 'Filter by Species',
            sorting: 'Sort by',
          },
          status: {
            all: 'All Status',
            alive: 'Alive',
            dead: 'Dead',
            unknown: 'Unknown',
          },
          species: {
            all: 'All Species',
            human: 'Human',
            alien: 'Alien',
          },
          sorting: {
            none: 'No Sorting',
            name: 'Sort by Name',
            origin: 'Sort by Origin',
          },
          pagination: {
            previous: 'Previous',
            next: 'Next',
            page: 'Page',
          },
          character: {
            status: 'Status',
            species: 'Species',
            gender: 'Gender',
            origin: 'Origin',
          },
        },
      },
      de: {
        translation: {
          title: 'Rick und Morty Charaktere',
          filters: {
            status: 'Nach Status filtern',
            species: 'Nach Spezies filtern',
            sorting: 'Sortieren nach',
          },
          status: {
            all: 'Alle Status',
            alive: 'Lebendig',
            dead: 'Tot',
            unknown: 'Unbekannt',
          },
          species: {
            all: 'Alle Spezies',
            human: 'Mensch',
            alien: 'Außerirdischer',
          },
          sorting: {
            none: 'Keine Sortierung',
            name: 'Nach Name sortieren',
            origin: 'Nach Herkunft sortieren',
          },
          pagination: {
            previous: 'Zurück',
            next: 'Weiter',
            page: 'Seite',
          },
          character: {
            status: 'Status',
            species: 'Spezies',
            gender: 'Geschlecht',
            origin: 'Herkunft',
          },
        },
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
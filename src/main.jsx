import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n.jsx';
import client from './utils/apolloClient.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
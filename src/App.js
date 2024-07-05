import React, { useState, useEffect } from 'react';
import QuoteCard from './QuoteCard';

const App = () => {
  const [quote, setQuote] = useState('');
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      const data = await response.json();
      setQuote(data[0]);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const saveQuote = () => {
    setSavedQuotes([...savedQuotes, quote]);
  };

  return (
    <div className="app">
      <h1>Ron Swanson Quotes</h1>
      <button onClick={fetchQuote}>Get Random Quote</button>
      {quote && <QuoteCard quote={quote} onSave={saveQuote} />}
      <h2>Saved Quotes</h2>
      {savedQuotes.map((savedQuote, index) => (
        <div key={index}>{savedQuote}</div>
      ))}
    </div>
  );
};

export default App;
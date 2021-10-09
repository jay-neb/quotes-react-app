import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  function fetchRandomQuote() {
    const url = "https://tarry-wild-temper.glitch.me/quotes/random";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuotes([data]);
        setShowNoResults(false);
      });
  }

  function fetchAllQuotes() {
    const url = "https://tarry-wild-temper.glitch.me/quotes";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data);
        setShowNoResults(false);
      });
  }

  function searchQuote() {
    const url = "https://tarry-wild-temper.glitch.me/quotes/search?term=" + searchTerm;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data);
        setShowNoResults(data.length === 0);
      });
  }

  const quotesDiv = quotes.map((quoteObj) => {
    return <Quote quote={quoteObj.quote} author={quoteObj.author}/>
  });

  return (
    <div className="App">
      <header className="App-header">
        {<button onClick={fetchAllQuotes}>All Quotes</button>}
        {<button onClick={fetchRandomQuote} style={{marginTop: 25}}>Random Quote</button>}

        <input
          placeholder="Enter term"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          style={{marginTop: 30}}
        />
        <button onClick={searchQuote} style={{marginTop: 10}}>Search</button>

        {quotesDiv}
        {showNoResults && <div style={{marginTop: 20}}>No results</div>}
      </header>
    </div>
  );
}

function Quote(props) {
  return (
    <div style={{marginTop: 35, width: "40%"}}>
      <div style={{fontStyle: "italic", textAlign: "left"}}>{props.quote}</div>
      <div style={{marginTop: 25, textAlign: "right"}}>{props.author}</div>
    </div>
  );
}

export default App;
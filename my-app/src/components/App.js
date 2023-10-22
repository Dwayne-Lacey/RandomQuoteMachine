import './App.css';
import Quotebox from './Quotebox'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuote } from '../configureStore'; 

export const App = () => {
  const quote = useSelector(state => state.quote);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchQuote())
  }, [dispatch]);
  return (
    <div className="App">
      <Quotebox/>
      <h1>Anotha test</h1>
      {quote.loading && <div>Loading</div>}
      {!quote.loading && quote.error ? <div>Error: {quote.error}</div> : null}
      {!quote.loading && typeof quote.users == "object" ? (
        <h1>{quote.users.quote}</h1>
      ) : null}
    </div>
  );
}

export default App;

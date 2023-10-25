import './Quotebox.css';
import { fetchQuote, colorGen } from '../configureStore'; 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useTestClick = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch({type: "HIDDEN", color: colorGen()});
    setTimeout(() => {
      dispatch(fetchQuote());
      
    }, 600)
    setTimeout(() => {
      
      dispatch({type: "VISIBLE"});
    }, 700)
    
  };
};


export const Quotebox = () => {
  const quote = useSelector(state => state.quote);
  const visibility = useSelector(state => state.visibility)
  const testClick = useTestClick();

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchQuote());
  }, [dispatch]);


  return (
    <div className="Quotebox" id="quote-box">
      <h1>{visibility.color}</h1>
      <input type="button" onClick={testClick} value="New Quote" />
      {!quote.loading && typeof quote.quote == "object" ? (
        <h1 className={"fade-wrapper " + visibility.visibility} style={{color: visibility.color}}>{quote.quote.quote}</h1>
      ) : null}
    </div>
  );
}

export default Quotebox;
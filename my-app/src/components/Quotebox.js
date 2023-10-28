import './Quotebox.css';
import { fetchQuote, colorGen } from '../configureStore'; 
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'

const useTestClick = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch({type: "HIDDEN"});
    setTimeout(() => {
      dispatch(fetchQuote());
      
    }, 600)
    setTimeout(() => {
      
      dispatch({type: "VISIBLE", color: colorGen(), author: "Kanye"});
    }, 700)
    
  };
};


export const Quotebox = () => {
  const quote = useSelector(state => state.quote);
  const visibility = useSelector(state => state.visibility)
  const testClick = useTestClick();

  const dispatch = useDispatch()
  useLayoutEffect(() => {
    dispatch(fetchQuote());
  }, [dispatch]);


  return (
    <div className="Quotebox" id="quote-box">
      <div className="quote-wrapper">
        {!quote.loading && typeof quote.quote == "object" ? (
          <h1 id="text" className={"text-center fade-wrapper quote " + visibility.visibility} style={{color: visibility.color}}><i>{quote.quote.quote}</i></h1>
        ) : null}
      </div>
      <div className='row'>
          <div className="d-flex align-items-start justify-content-end">
            <h1 id="author" className={"quote fade-wrapper " + visibility.visibility} style={{color: visibility.color}}>{"-" + visibility.author}</h1>
          </div>
      </div>
      <div className="row">
        <div className="col d-flex align-items-center justify-content-center">
          <a href="https://twitter.com/intent/tweet" target="_blank" rel="noreferrer" id="tweet-quote"><FontAwesomeIcon className="social" icon={faXTwitter} style={{backgroundColor: visibility.color}} /></a>
        </div>
        
        <div className="col d-flex align-items-center justify-content-center">
          <button id="new-quote" className="button" type="button" style={{backgroundColor: visibility.color}} onClick={testClick}>New Quote</button>
        </div>
        
      </div>
      
    </div>
  );
}

export default Quotebox;
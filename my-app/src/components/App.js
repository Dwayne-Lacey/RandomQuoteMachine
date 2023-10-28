import './App.css';
import Quotebox from './Quotebox'
import { useSelector } from 'react-redux'


 
export const App = () => {
  const visibility = useSelector(state => state.visibility);
 
  return (
    <div className="App d-flex align-items-center justify-content-center" style={{background:  visibility.color}}>
      <Quotebox />
    </div>
  );
}

export default App;

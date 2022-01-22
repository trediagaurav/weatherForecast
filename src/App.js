import { useEffect, useState } from 'react';
import './App.css';
import Theme from './theme/Theme';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Fav from './components/Fav';
import Top from './components/Top';


function App() {
  const [checked, setChecked] = useState(false);
  
  const handleChange=()=>{
    setChecked (!checked)
}
  useEffect(() => {
  }, [checked])
  return (
    <div data-theme={checked} className='main'>
      <Top />
      <div>
            <label className="switch" style={{marginRight:"50px"}}>
                <input type="checkbox" value={checked} onChange={handleChange} />
                <span className="slider round"></span>
            </label>  
        </div>
      <Routes>
        <Route path="/" exactly element={<Home />} />
        <Route path="/favorite" element={<Fav />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

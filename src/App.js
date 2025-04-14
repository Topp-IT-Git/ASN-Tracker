import Table from './components/Table';
import './App.css';
import {Routes,Route}  from 'react-router-dom' 
import Graphic from './components/Graphic';
import Navbar from './components/Navbar';
import TransHistory from './components/TransHistory.js';
import TradingComp from "./components/TradingComp.js"

import Graph from "./pages/Graph.js" 
import Trading from "./pages/Trading.js"

function App() {
 // Event handler for hovering over the paragraph

  return (
    <div className="App">
       
        <Navbar/>
      
        <Routes>
        <Route path="/graph" element={<Graph />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="./transactions" element={<TransHistory/>}/>
        </Routes>
        
      
     
  

    </div>
  );
}

export default App;

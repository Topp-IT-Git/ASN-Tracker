import Table from './components/Table';
import './App.css';
import {Routes,Route}  from 'react-router-dom' 
import Graphic from './components/Graphic';
import BoughtStocks from './components/BoughtStocks';
import Navbar from "./Navbar.js"
import Graph from "./pages/Graph.js" 
import Trading from "./pages/Trading.js"

function App() {
 // Event handler for hovering over the paragraph

    return (

    <div className="App">
       
        <Navbar/>
      
      <h2>Koersen ASN Beleggingsfondsen</h2>
       <Table/>
       <Graphic/>
       <BoughtStocks/>

  

    </div>
  );
}

export default App;

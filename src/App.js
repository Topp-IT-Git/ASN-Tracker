import Table from './components/Table';
import './App.css';

import Navbar   from "./components/Navbar"

import Graph from "./pages/Graph"
import Trade from "./pages/Trade"

import {Routes,Route} from 'react-router-dom'
function App() {
 // Event handler for hovering over the paragraph
    return (

    <div className="App">

    <Navbar/>
        <Routes>
          <Route path="./graph" element={<Graph/>}/>
          <Route path="./trade" element={<Trade/>}/>
       
        </Routes>


  

    </div>
  );
}

export default App;

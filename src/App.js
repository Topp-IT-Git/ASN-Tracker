import {Routes,Route}  from 'react-router-dom' 
import Navbar   from "./components/Navbar"
import Footer from './components/Footer.js'
import Transaction from './components/Transaction.js'
import Graph from "./pages/Graph.js"
import TransactionHistory from "./pages/TransactionHistory.js"
import Stocks from "./pages/Stocks.js"
import Home from './pages/Home.js';
import "./App.css"
function App() {
 // Event handler for hovering over the paragraph

    return (
    <div className="App">

    <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Graph" element={<Graph/>}/>
          <Route path="/Stocks" element={<Stocks/>}/>
          <Route path="/TransactionHistory" element={<TransactionHistory/>}/>
        </Routes>
        <Transaction/>
        <Footer/>
    </div>
  );
}

export default App;
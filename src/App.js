import Table from './components/Table';
import './App.css';
import Graphic from './components/Graphic';
import BoughtStocks from './components/BoughtStocks';


function App() {
 // Event handler for hovering over the paragraph

    return (

    <div className="App">
      
      <h2>Koersen ASN Beleggingsfondsen</h2>
       <Table/>
       <Graphic/>
       <BoughtStocks/>

  
    </div>
  );
}

export default App;

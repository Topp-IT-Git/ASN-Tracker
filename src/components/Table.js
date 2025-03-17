import './style.css';
import React from 'react'
import { useState,useEffect } from 'react'
export default function Table(){
  const [data,setData]=useState([]);


  useEffect(()=>{

   fetch('https://asn-tracker.paulvandenburg.nl/get_fund_data.php')
   .then(res =>res.json())
    .then(data => setData(data))
    },[])


    if (data.length ===0){
      return <p>Loading...</p>
    }

  return (
    <div className="p-4">
  <table>
<thead>
    <tr>
    <th>Koersen</th>
    {/*hieronder wordt door de data geparsed het verwerkt de bovenste rij van de tabel. hierin vind je de kopje koersen en de datums van elke aandeel*/}
    {Object.keys(data[0].prices).map(price =>
    (<td className="datums">{price}</td>
            
          ))}
    </tr>
    </thead>

    <tbody>
    {/*Hieronder worden de namen van de bedrijven van de aandelen in de kopje verwerkt en dan de koers */}
    {data.map(fund => (
    <tr>
            <th key={fund.fundId}>{fund.fundName.slice(4)}</th>
        {Object.values(fund.prices).map(price =>(
          <td>{price}</td>
          ))}
    </tr>))}
    
    </tbody>
  
  </table>
  </div>
  )}
  


      

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
    {Object.keys(data[0].prices).map(price =>
          (<td>{price}</td>
            
          ))}
    </tr>
    </thead>

    <tbody>
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
  


      

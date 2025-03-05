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
    <tbody>
    <tr>
    <th>Koersen</th>
    {Object.keys(data[0].prices).map(price =>
          (
          <>
          <td>{price}</td>
          </>
          ))}
    </tr>
    {data.map(fund => (
    <tr key={fund.fundId}>
          <th key={fund.fundId}>{fund.fundName}</th>
        {Object.values(fund.prices).map(price =>
          (<td>{price}</td>

          ))}
         
    </tr>))}
  
    </tbody>
    </thead>
  </table>
  </div>
  )}
  


      
  // {/* {data.map(fund => (
  //   <tr key={fund.fundId}>
  //         <tr key={fund.fundId} >{fund.fundName}</tr>
  //         <td> {Object.values(fund.prices)}</td>
  //         </tr>
  //     ))} */}
  //   {/* {data.map(data =>
  //       <tr key={data.fundId}>
  //       <td>{data.fundId}</td>
  //     <td>{data.fundName}</td>
  //     </tr>)} */}
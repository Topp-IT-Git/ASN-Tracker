import React from 'react'
 import './transaction.css'
import {useEffect,useState} from "react"
 export default function Transaction() {
 
  const [fund ,setFund]=useState({})

useEffect(()=>{
    fetch("https://asn-tracker.paulvandenburg.nl/get_fund_data.php")
    .then (res => res.json())
    .then(data=>setFund(data))
},[])

  return (
 <div>
    <ul>
        {fund.fundID}
      {fund.FundName}
    </ul>
        <table className='trade-table'>           
          <thead>
             <tr>    
              <th>Type</th>              
               <th>Price ($)</th>
              <th>Time</th>
            </tr>
          </thead>
           <tbody>
              <tr>
                <td></td>    
                <td></td>
                 <td></td>              
               </tr>
           </tbody>
         </table>

 </div>  
 )
 }


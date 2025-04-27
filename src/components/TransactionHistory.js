import React from 'react'
 import './transactionHistory.css'

 export default function TransactionHistory() {
   return (     
   <div>
     <h3>📜 Trade History</h3>
     <p>No trades yet. </p>
      
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


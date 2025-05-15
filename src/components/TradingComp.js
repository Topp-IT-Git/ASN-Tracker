import React from 'react'
import {useState} from "react"
import "./tradingComp.css"
export default function TradingComp() {
const [balance , setBalance] =useState(10000);
const [quantity,setQuantity] =useState(0);
const [stockPrice,setStockPrice]=useState([])

function handelBuy(){
  setBalance(balance - stockPrice)
 console.log("Buy Succsesfull" ) 

}

 function handelSell(){
  console.log("sold!") 
 }

 
  return (
    <div className="trading-app ">
      <h1>Welcome!</h1> 
      <h3>Balance:{balance}</h3>
      <p>StockPrice:{}</p>
      <input
      classname="Input"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <div className="button-container">
      <button className="buy-button" onClick={handelBuy}>Buy</button>
      <button className="sell-button" OnClick={handelSell}>Sell</button>
      </div>
      </div>
    
  )
}



import './style.css';
import React from 'react'

let checkArray = []
const priceArray = []

const ResetKleur = (reset) => {
    checkArray = Object.values(reset.fund["prices"])
    
    let beginArray = 0
    beginArray = reset.arrayToZero
    if (beginArray > 0) {
        priceArray.length = 0
        beginArray = 0
    }
    return (
        <></>
    )
}

const TableKleur = (price) => {
    priceArray.push(price["price"])
    const rendement = (priceArray[priceArray.length-1] - checkArray[priceArray.indexOf(price["price"])/2 + 1]).toFixed(2)
    return (
        <div style={{backgroundColor: rendement > 0 ? '#26B170' : rendement < 0 ? '#D2222D' : 'white'}}>
            <p>{Object.values(price)}</p>
        </div>
    )
}

export {TableKleur,ResetKleur} 
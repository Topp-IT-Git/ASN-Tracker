import './style.css';
import React from 'react'


const priceArray = []

const ResetKleur = (reset) => {
    let beginArray = 0
    beginArray = Object.values(reset)
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
    console.log(priceArray)
    const rendement = (priceArray[priceArray.length-1] - priceArray[priceArray.length-3]).toFixed(2)
    return (
        <div style={{backgroundColor: rendement > 0 ? 'green' : rendement < 0 ? 'red' : 'white'}}>
            <p>{Object.values(price)}</p>
        </div>
    )
}

export {TableKleur,ResetKleur} 
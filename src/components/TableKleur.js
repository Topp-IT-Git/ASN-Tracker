import './style.css';
import React from 'react'

const priceArray = [0]

const TableKleur = (price) => {
    priceArray.push(price["price"])
    const rendement = (priceArray[priceArray.length-2] - priceArray[priceArray.length-4]).toFixed(2)
    const tijdelijk = price
    console.log(rendement)
    console.log(price)
    console.log(priceArray)
    return (
        <div style={{backgroundColor: rendement > 0 ? 'green' : rendement < 0 ? 'red' : 'white'}}>
            <p>{rendement}</p>
        </div>
    )
}

export default TableKleur
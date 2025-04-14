import React from 'react'
import { useEffect, useState } from 'react'

    

export default function NumberInput() {
    const [number, setNumber] = useState("");
    const [submittedNumber, setSubmittedNumber] = useState(0);
    const [balance, setBalance] = useState(200);






    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    }
    
        const [currentDate, setCurrentDate] = useState(getDate());

    const [data, setData] = useState([]);
    
   

 




    // Load saved balance and submitted number from localStorage on mount
    useEffect(() => {
        fetch('https://asn-tracker.paulvandenburg.nl/api/fund-prices?funds=1&date_from=2025-04-14&date_to=2025-04-14')
            .then(res => res.json())
            .then(data => setData(data))
        const savedBalance = localStorage.getItem("balance");
        const savedNumber = localStorage.getItem("savedNumber");

        if (savedBalance) setBalance(Number(savedBalance));
        if (savedNumber) setSubmittedNumber(Number(savedNumber));
    }, []);
    if (data.length === 0) {
        return <p>Loading...</p>
    }

    const huidigeWaarde = data[0].prices;
    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredAmount = Number(number);

        if (enteredAmount > balance) {
            alert("Oeps, je geld is op!");
            return;
        }

        const newBalance = balance - enteredAmount;
        const newSubmittedTotal = submittedNumber + enteredAmount; // Accumulate entered numbers


        setSubmittedNumber(newSubmittedTotal);
        setBalance(newBalance);

        localStorage.setItem("savedNumber", newSubmittedTotal);
        localStorage.setItem("balance", newBalance);
    };

    const handleReset = () => {
        setSubmittedNumber(0);
        setBalance(200);
        localStorage.setItem("savedNumber", 0);
        localStorage.setItem("balance", 200);
    };

    return (
        <div className="kopen">
            <h2>Saldo: &euro; {balance}</h2>
            

            <form id="aantalinput" onSubmit={handleSubmit} >
                <input
                    
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Voer het aantal in"
                />
                <button id="koopknop" type="submit" >
                    Kopen
                </button>
                
            </form>
            <span>Aantal Euro ingepompt: {submittedNumber}</span>
            <br />
            <h3>Totale waarde: &euro; {submittedNumber * huidigeWaarde["2025-04-14"]}</h3> 
            {/* Reset Button */}
            <button
                onClick={handleReset}
               
            >
                Reset
            </button>

        </div>
    );
}






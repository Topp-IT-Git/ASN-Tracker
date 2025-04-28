import React from 'react'
import { useEffect, useState } from 'react'
import "./boughtstock.css"

export default function NumberInput() {
    const [number, setNumber] = useState("");
    const [submittedNumber, setSubmittedNumber] = useState(0);
    const [balance, setBalance] = useState(1000);

    // Get current date in YYYY-MM-DD format
    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
    }

    const [currentDate, setCurrentDate] = useState(getDate());
    const [data, setData] = useState([]);

    // Load saved balance and submitted number from localStorage on mount
    useEffect(() => {
        fetch('https://asn-tracker.paulvandenburg.nl/get_fund_data.php')
            .then(res => res.json())
            .then(data => setData(data));
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
        const currentPrice = huidigeWaarde[currentDate]; // Use currentDate here

        if (enteredAmount > balance) {
            alert("Oeps, je geld is op!");
            return;
        }

        // Check if the currentPrice is valid
        if (isNaN(currentPrice) || currentPrice <= 0) {
            alert("Huidige waarde is ongeldig");
            return;
        }

        const totalCost = enteredAmount * currentPrice;

        // Prevent balance from going negative
        if (balance - totalCost < 0) {
            alert("Je hebt niet genoeg saldo voor deze transactie!");
            return;
        }

        const newBalance = balance - totalCost;
        const newSubmittedTotal = submittedNumber + enteredAmount;

        setSubmittedNumber(newSubmittedTotal);
        setBalance(newBalance);

        localStorage.setItem("savedNumber", newSubmittedTotal);
        localStorage.setItem("balance", newBalance);
    };

    const handleReset = () => {
        setSubmittedNumber(0);
        setBalance(1000);
        localStorage.setItem("savedNumber", 0);
        localStorage.setItem("balance", 1000);
    };

    const totaleWaarde = submittedNumber * (huidigeWaarde[currentDate] || 0); // Use currentDate for the total value

    return (
        <div className="kopen">
            <h2>🪙 Huidige Waarde: &euro;{huidigeWaarde[currentDate]}</h2>
            <h2>💳 Saldo: &euro; {balance.toFixed(2).replace('.', ',')}</h2>

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
            <span>Aandelen in bezit: {submittedNumber}</span>
            <br />
            <h3>Totale waarde: &euro; {totaleWaarde.toFixed(2).replace('.', ',')}</h3>
            {/* Reset Button */}
            <button
                onClick={handleReset}
            >
                Reset
            </button>
        </div>
    );
}
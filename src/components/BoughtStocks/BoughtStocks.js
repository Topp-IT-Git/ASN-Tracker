/* importeren van react, useState van react (hook om local state bij te kunnen houden), useEffect van react (hook voor side effects,zoals data fetchen en local storage) 
en het importeren van de css bestand om je styling toe te passen */
import React, { useEffect, useState } from "react";
import "./boughtstock.css";

// function stockmanager: start van je react component. Alles wat je component nodig heeft staat tussen de curly brackets van deze function
export default function StockManager() {

    /* STATE VARIABELEN, gegevens die react onthoudt: 
    ------------------------------------------------------------------------------------------------------------------------------------------*/

    //input veld voor het aantal aandelen dat de gebruiker wil kopen, default is een lege string
    const [number, setNumber] = useState("");
    //het aantal aandelen dat de gebruiker heeft gekocht, default is 0
    const [submittedNumber, setSubmittedNumber] = useState(0);
    //huidige saldo van de gebruiker, default is 1000
    const [balance, setBalance] = useState(1000);
    //hier wordt data van de API gehaald, default is een lege array
    const [data, setData] = useState([]);
    //historie, een lijst van alle eerdere aankopen van de gebruiker, default is een lege array
    const [history, setHistory] = useState([]);

    /*----------------------------------------------------------------------------------------------------------------------------------------*/

    //function om de huidige datum te krijgen in het formaat YYYY-MM-DD, dit heb je nodig zodat je kunt opzoeken wat de prijs van de aandelen vandaag is.
    const getDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        return `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date
            }`;
    };
    const currentDate = getDate();

    /* FUNCTION OM DE DATA VAN DE API OP TE HALEN, deze wordt 1 keer uitgevoerd wanneer de component geladen wordt
    ------------------------------------------------------------------------------------------------------------------------------------------*/

    //een useEffect hook die gebruikt wordt om vervolgens de side effect "fetch" te gebruiken om data op te halen vanuit de API
    useEffect(() => {
        fetch("https://asn-tracker.paulvandenburg.nl/get_fund_data.php")
            //als er een fout is met de verbinding, dan wordt er een error weergegeven
            .then((res) => {
                if (!res.ok) throw new Error("Netwerkfout");
                // Daarna wordt de response omgezet naar een JavaScript - object(res.json)
                return res.json();
            })
            .then((data) => setData(data))
            //Zodra de data is binnengekomen, wordt deze opgeslagen in de data state.
            .catch((err) => {
                //als er een fout is met het ophalen van de data, dan wordt er een error weergegeven en de fout zal gelogd worden in de console 
                console.error(err);
                alert("Data ophalen is mislukt. Probeer het later opnieuw.");
            });

        /*----------------------------------------------------------------------------------------------------------------------------------------*/

        //eerder opgeslagen data uit local storage worden hier gelezen
        const savedBalance = localStorage.getItem("balance");
        const savedNumber = localStorage.getItem("savedNumber");
        const savedHistory = localStorage.getItem("purchaseHistory");

        //hier wordt de data uit de localstorage gehaald en opgeslagen in de state variabelen
        if (savedBalance) setBalance(Number(savedBalance));
        if (savedNumber) setSubmittedNumber(Number(savedNumber));
        //Omdat localStorage alleen strings opslaat, moet je de history (die een array is) parsen van JSON terug naar een array van objecten.
        if (savedHistory) setHistory(JSON.parse(savedHistory));
    }, []);

    //zorgt voor een "Loading..." text zolang de data nog niet binnen is
    if (data.length === 0) return <p>Loading...</p>;

    //Een variabel genaamd priceHistory met als inhoud een array met de prijzen van het eerste fonds (ASN Duurzaam Aandelenfonds) uit je variabel "data" die we gefetched hebben)
    const priceHistory = data[0].prices;
    //Een variabel genaamd currentPrice met als inhoud de price van de huidige datum (currentDate is een variabel die we eerder hebben gemaakt en hier toe passen als argument)
    const currentPrice = priceHistory[currentDate];

    /*
    reminder:
    data = array met alle fondsen
    data[0] het eerste fonds in die array (in dit geval ASN Duurzaam Aandelenfonds)
    data[0].prices = lijst met prijzen en datums van dat fonds
    data[0].prices[currentDate] = de prijs van dat fonds op de huidige datum, we gebruiken hier een variabel als argument
    */

    // geeft een melding als er geen pijs is voor de huidige datum
    if (!currentPrice)
        return <p>Geen prijsdata beschikbaar voor vandaag ({currentDate}).</p>;

    // wordt aangeroepen als het formulier wordt ingediend (koopknop gebruikt wordt)
    const handleSubmit = (e) => {
        // voorkomt dat de pagina opnieuw geladen wordt (standaardgedrag van een formulier in de browser)
        e.preventDefault();
        //Zet de string-invoer (number, van het inputveld) om naar een getal (enteredAmount).
        const enteredAmount = Number(number);

        // controleert of het ingevoerde aantal positief is, anders krijg je een error melding
        if (!Number.isInteger(enteredAmount) || enteredAmount <= 0) {
            alert("Voer een geldig positief geheel getal in.");
            return;
        }
        //berekent de totale kosten van de aandelen die je wilt kopen
        const totalCost = enteredAmount * currentPrice;

        //controleert of je genoeg saldo hebt voor de totale kosten van de aandelen, anders krijg je een error melding
        if (balance - totalCost < 0) {
            alert("Je hebt niet genoeg geld voor deze transactie!");
            return;
        }

        //hier wordt je nieuwe balans berekend
        const newBalance = balance - totalCost;
        //hier wordt je nieuwe aantal aandelen berekend
        const newSubmittedTotal = submittedNumber + enteredAmount;

        //hier wordt de balans en het aantal aandelen opgeslagen in de state variabelen
        setBalance(newBalance);
        setSubmittedNumber(newSubmittedTotal);

        //hier wordt alle info over de nieuwe aankoop opgeslagen, wordt uiteindelijk in de history array opgeslagen
        const newEntry = {
            date: currentDate,
            amount: enteredAmount,
            pricePerShare: currentPrice,
            totalCost: totalCost.toFixed(2),
        };
        //hier wordt de nieuwe aankoop opgeslagen in de history array
        const newHistory = [newEntry, ...history];
        //de history state wordt hier geupdated met de nieuwe aankoop
        setHistory(newHistory);

        //hier wordt de nieuwe balans, het aantal aandelen en de history opgeslagen in local storage
        localStorage.setItem("balance", newBalance);
        localStorage.setItem("savedNumber", newSubmittedTotal);
        //purchaseHistory moet als JSON opgeslagen worden omdat localstorage alleen strings kan opslaan
        localStorage.setItem("purchaseHistory", JSON.stringify(newHistory));
        //hier wordt het inputveld weer leeggemaakt na aankoop
        setNumber("");
    };

    //function voor de reset knop, hiermee kan je alles resetten naar de default waarden: saldo 100, aantal aandelen 0 en geen aankoopgeschiedenis (geldt ook voor localStorage)
    const handleReset = () => {
        setSubmittedNumber(0);
        setBalance(1000);
        setHistory([]);
        localStorage.setItem("savedNumber", 0);
        localStorage.setItem("balance", 1000);
        localStorage.removeItem("purchaseHistory");
    };

    //toont aan hoeveel al je aandelen waard zijn gebaseerd op de huidige koers
    const totaleWaarde = submittedNumber * currentPrice;

    /*JSX CODE (HTML Javascript hybrid code taal, maakt HTML Mogelijk in JS)----------------------------------------------------------------------------------------*/
    //vanaf hier bepalen we de layout van de pagina
    return (
        <div className="kopen">
            {/* toont de huidige prijs van 1 aandeel*/}
            <h2>🪙 Huidige Waarde: &euro;{currentPrice}</h2>
            {/* toont je huidige saldo */}
            <h2>💳 Saldo: &euro; {balance.toFixed(2).replace(".", ",")}</h2>

            {/* input veld voor het kopen van een aandeel  */}
            <form id="aantalinput" onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Voer het aantal in"
                    min="1"
                    step="1"
                />
                {/* submit knop voor het kopen van een aandeel*/}
                <button id="koopknop" type="submit">
                    Kopen
                </button>
            </form>

            <h3>📜 Koopgeschiedenis</h3>
            {/* een tabel van eerdere aankopen inclusief datum, aantal prijs per aandeel en totaalprijs*/}
            {history.length === 0 ? (
                <p>Geen aankopen gedaan.</p>
            ) : (
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Aantal</th>
                            <th>Prijs per aandeel</th>
                            <th>Totaalprijs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.amount}</td>
                                <td>&euro;{Number(item.pricePerShare).toFixed(2).replace(".", ",")}</td>
                                <td>&euro;{Number(item.totalCost).toFixed(2).replace(".", ",")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div style={{ marginTop: "1rem" }}>
                {/* toont het aantal aandelen dat je bezit */}
                <span>Aandelen in bezit: {submittedNumber}</span>
                <br />
                {/* toont hoeveel al je aandelen waard zijn op dit moment */}
                <h3>Totale waarde van je aandelen: &euro; {totaleWaarde.toFixed(2).replace(".", ",")}</h3>
                {/* reset knop om alles te resetten naar de default waarden */}
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
    /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
}

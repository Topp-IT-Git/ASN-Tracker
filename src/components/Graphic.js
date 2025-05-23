import React from 'react'
import {useEffect,useState} from 'react'
import {Line} from 'react-chartjs-2'
import { 
  Chart as ChartJS,
   CategoryScale, 
   LinearScale,
    LineElement,
    PointElement, 
    Tooltip, 
    Legend, 
    Title, 

  } from 'chart.js'; 
ChartJS.register(
  CategoryScale, // Handles categorical (e.g., labels on the x-axis) scaling
  LinearScale,   // Handles numerical (linear) scaling (e.g., y-axis values)
  LineElement,   // Defines the line itself in a line chart
  PointElement,  // Defines the points on the line chart
  Tooltip,       // Enables tooltips on hover
  Legend,        // Enables the chart legend
  Title          // Allows adding a title to the chart
)
const Graphic = () => {
const [data,setData] = useState([]);

  useEffect(()=>{
   fetch('https://asn-tracker.paulvandenburg.nl/get_fund_data.php')
   .then(res =>res.json())
    .then(data => setData(data))
    .catch(err => console.error(err))
    },[])
    // display only the first 10 prices for now
if (!data.length) return <p>Loading...</p>;

//hieronder vind je de data voor de aandelen grafiek
  const data1 = {
    labels:Object.keys(data[0]['prices']).reverse(), //["feb 22", "feb 23", "feb 24", "feb 25", "feb 26"],//
    datasets:[
      {
      data :Object.values(data[0]['prices']).reverse(),//[74,50,78,45,80,6],//
      label: 'ASN Duurzaam Aandelenfonds',
      borderColor:'#b1a0e2',
      backgroundColor: "#554096",
      borderWidth: 3,
      pointBorderwidth: 4
    }
  ]
  }
// hieronder vind je de grafiek voor de mixfondsen
  const data2 = {
    labels:Object.keys(data[1]['prices']).reverse(),//["feb 22", "feb 23", "feb 24", "feb 25", "feb 26"],
    datasets:[
      {
        label:  ' ASN Mixfonds Offensief',
      borderColor: '#fada87',
      backgroundColor: '#fada87',
      data :Object.values(data[1]['prices']).reverse(),//[74,50,78,45,80,6],//
      borderWidth: 3,
      pointBorderwidth: 4
    },
    {
      label: 'ASN Mixfonds Zeer Offensief',
      borderColor: '#ee6952',
      backgroundColor: '#ee6952',
      data :Object.values(data[2]['prices']).reverse(),//[82.1,82.84,82.84,83.66,83.41,83.76,83.76],//
      borderWidth: 4,
      pointBorderwidth: 4,}
    ]
  }
 
 // hieronder is de html hier worden alle functies gerenderd
  return (
      < >
      <div className="grafieken">
          <h3>Aandelen</h3>
        <div style={{ width:"600px", height:"300px"}}>

          <Line className="grafiek" data={ data1 } />
          <h3>Mixfondsen</h3>
      
         <Line className="grafiek" data={data2}/>
      
        </div>
      </div>
    </>
  )
}

export default Graphic


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

    const data1 ={
      labels:Object.keys(data[0]['prices']), 
      datasets:[
        {
        data :Object.values(data[0]['prices']),
        label: 'ASN Duurzaam Aandelenfonds',
        borderColor: 'rgb(209, 34, 139)',
        backgroundColor: 'rgb(209,34,139)',
        borderWidth: 3,
        pointBorderwidth: 4
      }
    ]
    }
  
    const data2 = {
      labels:Object.keys(data[1]['prices']),
      datasets:[
        {
          label: ' ASN Mixfonds Offensief',
        data :Object.values(data[0]['prices']),
        borderColor: 'rgb(209, 34, 139)',
        backgroundColor: 'rgb(209,34,139)',
        borderWidth: 3,
        pointBorderwidth: 4
      },
      {
        label: 'ASN Mixfonds Zeer Offensief',
        data :Object.values(data[2]['prices']),
        borderColor: 'rgba(44, 190, 209, 0.69)',
        backgroundColor: 'rgb(44,190,209,0.69)',
        borderWidth: 4,
        pointBorderwidth: 4
      }
    ]
    }
   const options={}
    return (
      < >
      
          <h3>Aandelen</h3>
       <div style={{ width:"600px", height:"300px", marginLeft:"20px"}}>
         
          <Line data={data1} options={options}/>
  
        <h3>Mixfondsen</h3>
        
          <Line data={data2} options={options}/>
          </div>
         
          
      </>
      
    )
  }
  
  export default Graphic
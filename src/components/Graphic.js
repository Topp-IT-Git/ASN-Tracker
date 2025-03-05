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
const [data,setData] = useState()

  useEffect(()=>{

   fetch('https://asn-tracker.paulvandenburg.nl/get_fund_data.php')
   .then(res =>res.json())
    .then(data => setData(data))
    },[])

  const data1 = {
    labels:["feb 22", "feb 23", "feb 24", "feb 25", "feb 26"],
    datasets:[
      {
      data :[74,50,78,45,80,6],
      label: 'ASN Duurzaam Aandelenfonds',
      borderColor: 'rgb(209, 34, 139)',
      backgroundColor: 'rgb(209,34,139)',
      borderWidth: 3,
      pointBorderwidth: 4
    }
  ]
  }

  const data2 = {
    labels:["feb 22", "feb 23", "feb 24", "feb 25", "feb 26"],
    datasets:[
      {
        label:  ' ASN Mixfonds Offensief',
      data :[74,50,78,45,80,6],
      borderColor: 'rgb(209, 34, 139)',
      backgroundColor: 'rgb(209,34,139)',
      borderWidth: 3,
      pointBorderwidth: 4
    },
    {
      label: 'ASN Mixfonds Zeer Offensief',
      data :[82.1,82.84,82.84,83.66,83.41,83.76,83.76],
      borderColor: 'rgba(17, 209, 235, 0.69)',
      backgroundColor: 'rgb(17, 211, 236)',
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

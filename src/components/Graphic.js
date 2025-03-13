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

//hieronder vind je de data voor de aandelen grafiek
  const data1 = {
    labels:Object.keys(data[0]['prices']), //["feb 22", "feb 23", "feb 24", "feb 25", "feb 26"]
    datasets:[
      {
      data :Object.values(data[0]['prices']),//[74,50,78,45,80,6]
      label: 'ASN Duurzaam Aandelenfonds',
      borderColor: 'rgb(209, 34, 139)',
      backgroundColor: 'rgb(209,34,139)',
      borderWidth: 3,
      pointBorderwidth: 4
    }
  ]
  }
// hieronder vind je de grafiek voor de mixfondsen
  const data2 = {
    labels:Object.keys(data[1]['prices']),//["feb 22", "feb 23", "feb 24", "feb 25", "feb 26"]
    datasets:[
      {
        label:  ' ASN Mixfonds Offensief',
      data :Object.values(data[1]['prices']),//[74,50,78,45,80,6]
      borderColor: 'rgb(209, 34, 139)',
      backgroundColor: 'rgb(209,34,139)',
      borderWidth: 3,
      pointBorderwidth: 4
    },
    {
      label: 'ASN Mixfonds Zeer Offensief',
      data :Object.values(data[2]['prices']),//[82.1,82.84,82.84,83.66,83.41,83.76,83.76]
      borderColor: 'rgba(44, 190, 209, 0.69)',
      backgroundColor: 'rgb(44,190,209,0.69)',
      borderWidth: 4,
      pointBorderwidth: 4
    }
  ]
  }
 const options={}
 // hieronder is de html hier worden alle functies gerenderd
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
// DIT CODE IS SECHT EN PEOPIE EN JE WET NEIT HOE JE CODERD

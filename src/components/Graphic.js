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
const [data,setData] = useState([{"prices":{"basis":10}},{"prices":{"basis":20}},{"prices":{"basis":30}}])

  useEffect(()=>{
   fetch('https://asn-tracker.paulvandenburg.nl/get_fund_data.php')
   .then(res =>res.json())
    .then(data => setData(data))
    },[])

    const testPriceValues = Object.values(data[2]['prices'])
    
//hieronder vind je de data voor de aandelen grafiek
  const data1 = {
    labels:Object.keys(data[0]['prices']), //["feb 22", "feb 23", "feb 24", "feb 25", "feb 26"],//
    datasets:[
      {
      data :Object.values(data[0]['prices']),//[74,50,78,45,80,6],//
      label: 'ASN Duurzaam Aandelenfonds',

      //Dit is voor de lijnkleur voor ASN Duurzaam aandelenfonds
      //Dit is voor de lijn
      borderColor: '#41775e',
      //Dit is voor de stippen
      backgroundColor: '#d42626',

      //Dit is voor lijndikte voor ASN Duurzaam aandelenfonds
      borderWidth: 1,
      pointBorderwidth: 10
    }
  ]
  }
// hieronder vind je de grafiek voor de mixfondsen
  const data2 = {
    labels:Object.keys(data[1]['prices']),//["feb 22", "feb 23", "feb 24", "feb 25", "feb 26"],
    datasets:[
      {
        label:  ' ASN Mixfonds Offensief',
//<<<<<<< HEAD
      data :[74],

      //Dit is voor de lijnkleur voor ASN Mixfonds Offensief
      borderColor: '#fada87',
      backgroundColor: '#fada87',


//=======
      data :Object.values(data[1]['prices']),//[74,50,78,45,80,6],//
 
//>>>>>>> 45103fc6eaa8c7d1e38d2830971369899a1a83b8
      //Dit is voor lijndikte voor ASN Mixfonds Offensief
      borderWidth: 3,
      pointBorderwidth: 4
    },
    {
      label: 'ASN Mixfonds Zeer Offensief',
//<<<<<<< HEAD
      data :[82.1,82.84,82.84,83.66,83.41,83.76,83.76,56,34,76,34,45],

      //Dit is voor lijnkleur voor ASN Mixfonds Zeer Offensief
      borderColor: '#ee6952',
      backgroundColor: '#ee6952',


//=======
      data :Object.values(data[2]['prices']),//[82.1,82.84,82.84,83.66,83.41,83.76,83.76],//
    
//>>>>>>> 45103fc6eaa8c7d1e38d2830971369899a1a83b8
      //Dit is voor lijndikte voor ASN Mixfonds Zeer Offensief
      borderWidth: 4,
      pointBorderwidth: 4
    }
  ]
  }
  const testData = {
    labels: ["1","2","3"],
    datasets:[
      {
      data :Object.values(data[0]['prices']),//[74,50,78,45,80,6],//
      label: 'ASN Duurzaam Aandelenfonds',

      //Dit is voor de lijnkleur voor ASN Duurzaam aandelenfonds
      //Dit is voor de lijn
      borderColor: '#41775e',
      //Dit is voor de stippen
      backgroundColor:'#d42626',/* function(){
        for ((let i = 1; i < this.data.length); i += 1) {
          const rendement = this.data[i] - this.data[i - 1]
          if (rendement < 0) {
            return "#ed0909"
          } else {
            return "#09ed18"
          }},*/

      //Dit is voor lijndikte voor ASN Duurzaam aandelenfonds
      borderWidth: 1,
      pointBorderwidth: 2
    }]
  }

 const options={}
 // hieronder is de html hier worden alle functies gerenderd
  return (
    < >
        <h3>Aandelen</h3>
     <div style={{ width:"600px", height:"300px"}}>

              <Line class="grafiek" data={ data1 } options={ options } />


      <h3>Mixfondsen</h3>
      
        <Line class="grafiek" data={data2} options={options}/>
      

      <h1>test grafiek</h1>

        {/*<Line class="grafiek" data={testData} options={options}/>*/}
        </div>
    </>
    
  )
}

export default Graphic


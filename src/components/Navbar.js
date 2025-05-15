import React from 'react'
import {Link} from 'react-router-dom'
import "./navbar.css"

export default function Navbar() {
  return (
    <nav className='nav'>
    <Link to="/" className='site-title'>ASN Tracker</Link>
  <ul>
    <li className='active'>
        <Link  to="/graph">Graph</Link>
        </li>
    <li> 
        <Link to="/stocks">Bought Stocks</Link>
        </li>
        <li> 
        <Link to="/transactionHistory">Transaction History</Link>
        </li>
  </ul>
</nav>
  
     

  )
}
// import {AppBar,Toolbar, Typography,Stack,Button} from "@mui/material"
   {/* // <AppBar  sx={{ bgcolor: "white" }}  >
        //     <Toolbar>
        //         <Typography color="textPrimary" variant="h5" component="div" sx={{ flexGrow: 1 }}>
        //         Koersen ASN Beleggingsfondsen
        //         </Typography>
        //         <Stack direction="row" spacing={2}>
        //             <Button sx={{color:"black"}}>Graph</Button>
        //             <Button sx={{color:"black"}}>Trading Screen</Button>
        //         </Stack>
        //     </Toolbar>
        // </AppBar> */}
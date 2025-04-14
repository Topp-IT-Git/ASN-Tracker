import React from 'react'
import "./navBarStyle.css"

//Importing the Link component from React Router to handle client-side routing
import {NavLink,Link} from 'react-router-dom'

export default function Navbar() {
  return (
  
    
      <nav className="navbar-container">
        <Link to="./" className="title"> Koersen ASN Beleggingsfondsen</Link>
        <ul className="links">
       { /*to="/"` navigates to the root route of the application */}
       <li><NavLink to="./graph">Graph</NavLink></li>
        <li><NavLink to="/trading">Trading</NavLink></li>
        <li><NavLink to="./transactions">Transaction History</NavLink></li>
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
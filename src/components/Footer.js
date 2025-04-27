import React from 'react'
import './footer.css'
export default function Footer() {
    const date= new Date().getFullYear();
  return (
    <div className="container-footer">

       <p>CopyRight by PVDB @{date}</p>
        
    </div>

  )
}


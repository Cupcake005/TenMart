import React from "react";
import '../Styles/headerCart.css';
import { useNavigate } from "react-router-dom";


const Headercart= ()=>{
    const navigate= useNavigate();
    return (
        <div className="headerCart">
            <i className="fa-solid fa-angle-left" onClick={()=>navigate('/')}></i>
            <h1 className="HCtitle">Keranjang Belanja</h1>
            
        </div>



       
    )
    
}


export default Headercart;
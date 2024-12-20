import React from "react";
import Cart from "../components/cart";
import Headercart from "../components/headerCart";



const cartPage = ()=>{
    return(
        <div>
            <Headercart />
            <div>
                <Cart />
            </div>
        </div>

    );
}

export default cartPage;
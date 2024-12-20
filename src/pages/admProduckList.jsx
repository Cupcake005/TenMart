import React from "react";
import ProductListAdm from "../components/ProductListAdm";
import "../Styles/ProductList.css";
import Headeradmin from "../components/headeradim";


const AdminProducts = () => {
    return (
        <div>
            <Headeradmin />
            <div className="container">
            <ProductListAdm />
        </div>
        </div>
    );
}

export default AdminProducts;

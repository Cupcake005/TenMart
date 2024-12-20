import React from "react";
import Header from '../components/header';
import ProductList from "../components/ProductList";
import ImageSlider from '../components/ImageSlider';





const Home = ({ searchTerm}) => {
    return (
        <div>
            <Header/>
            <div className="container">
                <ImageSlider/>    
                <div className="container-child">
                 <ProductList searchTerm={searchTerm} />
                </div>
                
            </div>
             

        </div>
    )
}

export default Home;
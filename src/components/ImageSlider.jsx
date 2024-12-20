// src/ImageSlider.js
import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/slider.css';

const ImageSlider = () => {

  const images = [
    '../img/bg.jpg',
    
    '../img/jh.jpg',
    '../img/kl.jpg',
  
    
  ];

  // Konfigurasi slider
  const settings = {
    dots: true,            
    infinite: true,        
    speed: 500,            
    slidesToShow: 1,       
    slidesToScroll: 1,     
    autoplay: true,        
    autoplaySpeed: 3000,   
    arrows: true,          
  };

  return (
    <div style={{backgroundColor:'transparent', width: '80%', marginTop: '10px',marginBottom:'10px' }} className='imgSlider'>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{ width: '100%', maxHeight:'300px', objectFit:'cover',borderRadius:'15px'}}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;

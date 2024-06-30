import React from 'react'
import Slider from "react-slick";
import slider3 from'../../assets/images/pro2.jpg'
 import slider1 from'../../assets/images/pro3.jpg'
import slider2 from'../../assets/images/pone.jpg'

export default function Productslider() {
    var settings = {
    
        infinite: true,
        speed: 20000,
        slidesToShow: 1,
        slidesToScroll: 1,
      
        autoplaySpeed:20000
    }
  return (
    <>
    <div className='ay'>
        <Slider {...settings}>
        <img src={slider3} className='w-100  imgessliders'  alt="" />
        <img src={slider3} className='w-100  imgessliders'  alt="" />
     

     
    </Slider>
    </div>
    </>
  )
}

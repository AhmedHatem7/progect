import React from 'react'
import Slider from "react-slick";
import slider3 from'../../assets/images/vet4.jpg'
 import slider1 from'../../assets/images/vet3.jpg'
import slider2 from'../../assets/images/vet1.jpg'

export default function DocSlider() {
    var settings = {
    
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true
        ,autoplaySpeed:1500
    }
  return (
    <>
    <div className='by'>
        <Slider {...settings}>
        <img src={slider3} className='w-100 imgessliders  '  alt="" />
      { <img src={slider1} className=' w-100 imgessliders ' alt="" /> }
      <img src={slider2}  className='w-100 imgessliders '   alt="" />
     

     
    </Slider>
    </div>
    </>
  )
}

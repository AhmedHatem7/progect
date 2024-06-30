import React from 'react'
import Slider from "react-slick";
import slider3 from'../../assets/images/petone.jpg'
 import slider1 from'../../assets/images/pettow.jpg'
import slider2 from'../../assets/images/petthere.jpg'

export default function MainSlider() {
    var settings = {
    
        infinite: true,
        speed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true
        ,autoplaySpeed:15000
   
    }
  return (
    <>
    <div className='ay'>
        <Slider {...settings}>
        <img src={slider3} className='w-100 imgesslider'  alt="" />
      { <img src={slider1} className=' w-100 imgesslider' alt="" /> }
      <img src={slider2}  className='w-100 imgesslider'   alt="" />
     

     
    </Slider>
    </div>
    </>
  )
}

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, json, params } from 'react-router-dom';
import { array } from 'yup';
import { Button } from 'bootstrap';
import DocSlider from '../Mainslider/DocSlider';

export default function Doctors() {
  const [AllVet, setAllVet] = useState([]);
  const [Loadine, setLoadine] = useState([]);

  const token = localStorage.getItem('Token');

  console.log(token);

  async function getAlldoctors() {
    try {
      

      const response = await axios.get(
        'http://fluffypet.runasp.net/api/Vets/Get_All_Vets?pageSize=1000000000',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setAllVet(response.data.data);
      console.log(response.data.data)
        } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAlldoctors();
  }, []);



  return (
    < >
 

   
      {console.log(AllVet)}
      <div className="containerx mt-4">
      <div className="d-flex justify-content-between upperdoc w-100 mt-5 ">
          <div   className="container">
             <div className='ms-5'>  <h1 className='doctextis' >Fluffy <span className='fontat'>pets</span> </h1> </div>
             <div className='ms-5'>  <h2 className='doctextis mt-4'>Healthy  care</h2> </div>
             <div className='ms-5'>  <h2 className='doctextis mt-4'>Healthy live</h2> </div>
          
          <p className='text-center para mt-5'> 
          Prompt veterinary diagnosis and treatment is essential in minimising any impact of pain, injury or disease</p>
          </div>
          <div className='w-50 h-100 '>
            <img src={require('../../assets/images/slickvet3.jpg')} alt="" />
          </div>
        </div>


        
  
      </div>

<section className='doccartma containerx '>
<div className="row  pb-5 ">

{AllVet.map((user)=>{ return<>
         
  <div className="col-md-4 mt-5"  key={user.id}>
<div>
<div  class="doccaet " style={{height:'300px', width:'340px'}} >
<Link to={'/OneDoctor/'+user.id}>
<img src={'http://fluffypet.runasp.net/' + user.photo} className=' w-100 h-100 border border-bottom-3 ' alt="" />
        </Link>
<div class=" card-body doccaet  w-100 ">
<div className="d-flex justify-content-between align-items-center pt-2 pb-2">
<h5 class="ms-2 card-title texttitle "><span className='texttitle'>Doctor: </span>{user.firstName+" "+user.lastName}</h5>
<button  className='btn btn-warning text-white me-2 '> <a href={`https://wa.me/+20${user.phoneNumber}`} target='_blank' className='text-white'> <span>chat</span> <i className="fa-brands fa-whatsapp "></i></a> </button>
</div>



</div>
</div>
</div>
</div>
</>




})}
</div>
</section>
    
    </>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GetVetService() {
  const [vetService, setvetService] = useState([]);
  const token = localStorage.getItem('Token');

  async function getVetsService() {
    try {
      const response = await axios.get(`http://fluffypet.runasp.net/api/Vets/GetAllVetServices`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setvetService(response.data); // Access the 'data' property of the response
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVetsService();
  }, []);

  return (
    < >
      
  {console.log(vetService,'vetService')}
  
  <div className="">
    
  
  <div className='    m-5 '>
        <table className="table table-light   ">
    <thead >
      <tr className='mx-auto'  >
        
       
      
        <th scope="col" className=' bg-warning text-white'>Id</th>
        <th scope="col" className=' bg-warning text-white' >service </th>
        <th scope="col "  className=' bg-warning text-white'>Descreption</th>
        <th scope="col "  className=' bg-warning text-white'>Price</th>
        <th scope="col "  className=' bg-warning text-white'>Update</th>
        <th scope="col "  className=' bg-warning text-white'>Delete</th>
  
  
      </tr>
    </thead>
    {vetService?.map(service=>{
    
      return<>
     
     <tbody className='' >
      
     <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.price}</td>
                <td><button className='btn btn-warning text-white'>update</button></td>
                <td><button className='btn btn-danger text-white'>Delete</button></td>
              </tr>
    
   
    </tbody>
              
      
      </>
      
  })}
    
  </table>
        </div>
  </div>
  
    </>
    )
  }


/*
<tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.price}</td>
                <td><button className='btn btn-warning text-white'>update</button></td>
                <td><button className='btn btn-danger text-white'>Delete</button></td>
              </tr>

*/